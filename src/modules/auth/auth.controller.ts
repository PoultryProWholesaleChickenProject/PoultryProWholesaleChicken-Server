// import { Request, Response } from 'express';
// import { AuthService } from './auth.service';
// import { User } from '../user/user.model';
// import { generateToken } from '../../shared/jwt';

// class AuthController {
//     async register(req: Request, res: Response) {
//         try {
//             const user = await AuthService.register(req.body);
//             const token = generateToken(user._id);
//             res.status(201).json({ user, token });
//         } catch (error) {
//             res.status(400).json({ message: error.message });
//         }
//     }

//     async login(req: Request, res: Response) {
//         try {
//             const { email, password } = req.body;
//             const user = await AuthService.login(email, password);
//             const token = generateToken(user._id);
//             res.status(200).json({ user, token });
//         } catch (error) {
//             res.status(401).json({ message: error.message });
//         }
//     }
// }

// export const authController = new AuthController();
