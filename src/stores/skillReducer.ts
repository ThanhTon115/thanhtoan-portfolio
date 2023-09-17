import { createAction, createReducer, current } from "@reduxjs/toolkit";
import { generateUniqueId } from "../utils";

interface SkillState {
  skills: Record<string, any>;
}

const initalState: SkillState = {
  skills: []
    .map((e: any) => {
      const _id = generateUniqueId(6);
      return { id: _id, ...e };
    })
    .reduce((items, item) => ({ ...items, [item.id]: item }), {}),
};

export const addSkill = createAction<any>("skill/create", (value) => {
  return {
    payload: {
      value,
      id: generateUniqueId(6),
    },
  };
});

const skillReducer = createReducer(
  initalState,
  {
    addSkill: (state, action) => {
      console.log(action, state.skills);
    },
  },
  [
    {
      matcher: ((action: any) => action.type.includes("cancels")) as any,
      reducer(state, action) {
        console.log(current(state), action);
      },
    },
  ],
  (state) => {
    console.log(current(state));
  }
);

export default skillReducer;
