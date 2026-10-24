const defaulPageValue = 0
const defaultLimitValue = 0
function getPagination(query){
    const page =Math.abs(query.page)|| defaulPageValue;
     const limit=Math.abs(query.limit) || defaultLimitValue;
     const skip= (page-1)*limit
     return{
        skip,
        limit
     }
}
export{
    getPagination
}