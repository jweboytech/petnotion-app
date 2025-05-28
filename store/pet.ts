import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface PetState {
  currPet: Pet;
  setCurrPet: (pet: Partial<Pet>) => void;
}

export const usePetStore = create<PetState>()(
  immer((set) => ({
    currPet: { name: "", photo: "", id: "" },
    setCurrPet: (payload) =>
      set((state) => {
        if (payload != null) {
          state.currPet.id = payload.id!;
          state.currPet.name = payload.name!;
          state.currPet.photo = payload.photo!;
        }
      }),
  }))
);
