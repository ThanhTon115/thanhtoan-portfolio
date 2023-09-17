import { createAction, createReducer, current } from '@reduxjs/toolkit'
import { generateUniqueId } from '../utils'

interface ProjectState {
  projects: Record<string, any>
}

const initalState: ProjectState = {
  projects: []
    .map((e: any) => {
      const _id = generateUniqueId(6)
      return { id: _id, ...e }
    })
    .reduce((items, item) => ({ ...items, [item.id]: item }), {})
}

export const addProject = createAction<any>('project/create', (value) => {
  return {
    payload: {
      value,
      id: generateUniqueId(6)
    }
  }
})

const projectReducer = createReducer(
  initalState,
  {
      addProject: (state, action) => {
        console.log(action, state.projects)
      },
  },
  [
    {
      matcher: ((action: any) => action.type.includes('cancels')) as any,
      reducer(state, action) {
        console.log(current(state), action)
      }
    }
  ],
  (state) => {
    console.log(current(state))
  }
)

export default projectReducer
