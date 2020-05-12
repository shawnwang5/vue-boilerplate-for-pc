export class TableUtils {
    static sortArray (tableData: any[], prop: string, isDescending: boolean) {
        for (let i = 0, lenI = tableData.length; i < lenI; i++) {
            for (let j = 0, lenJ = tableData.length - 1 - i; j < lenJ; j++) {
                let tempValueJ = +tableData[ j ][ prop ].replace('%', '')
                tempValueJ = tempValueJ ? tempValueJ : 0
                let tempValueJPlus1 = +tableData[ j + 1 ][ prop ].replace('%', '')
                tempValueJPlus1 = tempValueJPlus1 ? tempValueJPlus1 : 0
                if (isDescending) {
                    if (tempValueJ < tempValueJPlus1) {
                        const temp = tableData[ j ]
                        tableData[ j ] = tableData[ j + 1 ]
                        tableData[ j + 1 ] = temp
                    }
                } else {
                    if (tempValueJ > tempValueJPlus1) {
                        const temp = tableData[ j ]
                        tableData[ j ] = tableData[ j + 1 ]
                        tableData[ j + 1 ] = temp
                    }
                }
            }
        }
        return tableData
    }
}
