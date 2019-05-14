// 权限限制 用于区分当前权限下那个接口需要哪些权限
// 0 超管 1 普通 2 hr 3 boss
// 超管什么都能操作

export const gqlRoles = {
        Query: {
            cat: [1, 2, 3]
        },
        Mutation: {}
    
}