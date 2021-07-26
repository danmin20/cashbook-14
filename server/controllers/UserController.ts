import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import jwt, { Secret } from 'jsonwebtoken';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.userdata;

    const isAlreadyExist = await UserService.findUserByNickname({
      nickname: user.nickname,
    });

    // if (isAlreadyExist) {
    //   return res.status(300).json({
    //     message: '이미 존재하는 아이디 입니다.',
    //   });
    // }

    const result = await UserService.createUser(user);
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { nickname } = req.user;
    const { location1_id, location2_id } = req.body.user;
    const result = await UserService.updateUserLocation({
      location1_id,
      location2_id,
      nickname,
    });
    return res.status(200).json({
      message: 'success update locations',
      result,
    });
  } catch (error) {
    next(error);
  }
};

const getUserByNickname = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { nickname } = req.user;

  try {
    const result = await UserService.findUserByNickname({ nickname });

    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: any, res: Response, next: NextFunction) => {
  const { userId: id } = req.params;

  try {
    const result = await UserService.findUserById({ id });

    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const login = async (req: any, res: Response, next: NextFunction) => {
  const { nickname } = req.body;

  try {
    const result = await UserService.findUserByNickname({ nickname });

    // if (result) {
    //   // access token을 secret key 기반으로 생성
    //   const generateAccessToken = (nickname: string) => {
    //     return jwt.sign(
    //       { ...user },
    //       process.env.ACCESS_TOKEN_SECRET as Secret,
    //       {
    //         expiresIn: '1000h',
    //       }
    //     );
    //   };

    //   const accessToken = generateAccessToken(nickname);
    //   return res.status(200).json({ accessToken });
    // }
    return res.status(300).json({
      error: '존재하지 않는 유저입니다...',
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createUser,
  updateUser,
  login,
  getUserByNickname,
  getUserById,
};
