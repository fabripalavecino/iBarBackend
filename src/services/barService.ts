import Bar from "../models/Bar";
import { BarRequest, IBar } from "../types/bar.types";
import Business from "../models/Business";
import User, { IUser } from "../models/User";

export const createBar = async (data: BarRequest, userId: string): Promise<IBar> => {
    if (!data.name || !data.barLogo) {
        throw new Error("Both 'name' and 'barLogo' are required.");
    }

    const business = await Business.findOne({ _id: data.businessID, owner_id: userId });
    if (!business) {
        throw new Error("Invalid business ID or unauthorized access to business.");
    }

    const newBar = new Bar({
        name: data.name,
        businessID: data.businessID,
        barLogo: data.barLogo,
        drinksList: [],
        isDeleted: false,
    });

    return await newBar.save();
};

export const getBars = async ({ page, limit, search }: { page: number; limit: number; search: string }) => {
    const query = { isDeleted: false } as any;

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
        ];
    }

    const bars = await Bar.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

    const total = await Bar.countDocuments(query);
    return { bars, total, page, limit };
};

export const getBarById = async (id: string): Promise<IBar | null> => {
    return await Bar.findById(id).populate("drinksList");
};

export const updateBar = async (id: string, data: Partial<BarRequest>): Promise<IBar | null> => {
    return await Bar.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBar = async (id: string): Promise<void> => {
    await Bar.findByIdAndUpdate(id, { isDeleted: true });
};

export const addItemToBar = async (barId: string, itemId: string): Promise<IBar | null> => {
    return await Bar.findByIdAndUpdate(
        barId,
        { $push: { drinksList: itemId } },
        { new: true }
    ).populate("drinksList");
};

export const createBarManager = async ({
    first,
    last,
    email,
    phoneNumber,
    password,
    barID
}: {
    first: string;
    last: string;
    email: string;
    phoneNumber: string;
    password: string;
    barID: string;
}): Promise<IUser> => {
    const bar = await Bar.findById(barID);
    if (!bar) throw new Error("Bar not found");

    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) throw new Error("User with this email or phone number already exists");


    const newUser = new User({
        first,
        last,
        email,
        phoneNumber,
        password,
        userType: "barManager",
        businessID: bar.businessID,
        barID: bar._id
    });

    return await newUser.save();
};

