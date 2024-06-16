import { Response } from "express";
import userModel, { IUser } from "../models/user.model";

// Get user by ID
export const getUserById = async (id: string, res: Response) => {
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// Get all users
export const getAllUsersService = async (res: Response) => {
    try {
        const users = await userModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// Update user role by ID
export const updateUserRoleService = async (res: Response, id: string, role: string) => {
    try {
        const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
