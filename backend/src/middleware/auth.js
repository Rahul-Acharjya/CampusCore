import jwt from 'jsonwebtoken';
import {User} from '../models/index.js';
export async function protect(req,res,next){try{const h=req.headers.authorization||'';const token=h.startsWith('Bearer ')?h.slice(7):null;if(!token)return res.status(401).json({message:'Authentication required'});const p=jwt.verify(token,process.env.JWT_SECRET);const user=await User.findById(p.id).select('-passwordHash');if(!user||!user.isActive)return res.status(401).json({message:'Account unavailable'});req.user=user;next();}catch(e){return res.status(401).json({message:'Invalid or expired token'});}}
export const allow=(...roles)=>(req,res,next)=>roles.includes(req.user?.role)?next():res.status(403).json({message:'You do not have permission for this action'});
