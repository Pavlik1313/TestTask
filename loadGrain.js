function loadGrain (levels) {
    if (levels.length<3) return 0;

    let barriers = findBarriers(levels);
    if (barriers.length<2) return 0;

    let totalCapacity = 0;
    let binCounter = 0;
    let binCapacity = 0;

    for (let i=0; i < levels.length; i++){
        if (barriers.includes(i)){
            let leftBarrier = levels[barriers[binCounter]];
            let rightBarrier = levels[barriers[binCounter+1]];
            binCapacity = getBinCapacity(leftBarrier, rightBarrier);
            binCounter++;
        }else {
            let levelCapacity = getLevelCapacity(levels[i],binCapacity);
            totalCapacity += levelCapacity;
        }
    }
    return totalCapacity;
}


function getLevelCapacity (level, binCapacity) {
    if (level < binCapacity) return binCapacity-level;
    else return 0;
}


function getBinCapacity (leftBarrier, rightBarrier){
    return Math.min(leftBarrier, rightBarrier);
}


function findBarriers (levels) {
    levels.push(0); //додаємо нульовий рівень в кінці, щоб останній рівень був опрацьований в циклі
    let barriers = [];
    let lastBarrierHeight = 0;
    let barrierCandidates = [];

    for (let i=0; i < levels.length; i++){
        let currentLevel = levels[i];
        let nextLevel = levels[i+1];
        if (currentLevel > nextLevel){
            if (currentLevel > lastBarrierHeight){
                barriers.push(i);
                lastBarrierHeight = currentLevel;
                barrierCandidates = [];
            }else {
                for (let j = barrierCandidates.length-1; j > 0; j--){
                    if (levels[barrierCandidates[j]] < currentLevel){
                        barrierCandidates.pop();
                    }
                }
                barrierCandidates.push(i)
            }
        }
    }
    if(barrierCandidates.length>0){
        barriers = barriers.concat(barrierCandidates)
    }
    return barriers;

}