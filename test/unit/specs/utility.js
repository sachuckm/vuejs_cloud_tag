export function onmouseclick (rule, data) {
    return new Promise((resolve, reject) => {
        process.nextTick(
            () => resolve({})
        )
    })
}