import Bar from "../models/Bar";
import { BarRequest, IBar } from "../types/bar.types";

// ✅ Ensure drinksList is optional and barLogo is required
export const createBar = async (data: BarRequest): Promise<IBar> => {
    if (!data.barLogo) {
        throw new Error("barLogo is required.");
    }

    const newBar = new Bar({
        businessID: data.businessID,
        barLogo: data.barLogo,
        drinksList: [], // ✅ Always initialize as empty
        isDeleted: false,
    });

    return await newBar.save();
};

// ✅ Fetch bars with pagination & search (excluding soft-deleted bars)
export const getBars = async ({ page, limit, search }: { page: number; limit: number; search: string }) => {
    const query = { isDeleted: false } as any;

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } }, // Assuming `name` exists in Bar
        ];
    }

    const bars = await Bar.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

    const total = await Bar.countDocuments(query);
    return { bars, total, page, limit };
};

// ✅ Fetch a bar by ID, ensuring it exists
export const getBarById = async (id: string): Promise<IBar | null> => {
    return await Bar.findById(id).populate("drinksList"); // ✅ Populate drinksList with Item details
};

// ✅ Update a bar (excluding drinksList updates)
export const updateBar = async (id: string, data: Partial<BarRequest>): Promise<IBar | null> => {
    return await Bar.findByIdAndUpdate(id, data, { new: true });
};

// ✅ Soft delete by updating `isDeleted`
export const deleteBar = async (id: string): Promise<void> => {
    await Bar.findByIdAndUpdate(id, { isDeleted: true });
};

// ✅ New function to add items to drinksList
export const addItemToBar = async (barId: string, itemId: string): Promise<IBar | null> => {
    return await Bar.findByIdAndUpdate(
        barId,
        { $push: { drinksList: itemId } },
        { new: true }
    ).populate("drinksList"); // ✅ Ensure drinksList is updated with actual Item data
};
