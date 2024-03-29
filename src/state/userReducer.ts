type UserType = {
    name: string
    age: number
    childrenCount: number
}

type actionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: UserType, action: actionType) => {
    switch (action.type) {
        case "INCREMENT-AGE":
            return {...state, age: state.age + 1};
        case "INCREMENT-CHILDREN-COUNT":
            return {...state, childrenCount: state.childrenCount + 1};
        case "CHANGE-NAME":
            return {...state, name: action.newName}
        default:
            throw new Error('Error')
    }
}

