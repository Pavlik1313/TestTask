function loadGrain (levels) {
    if (levels.length<3) return 0;

    let barriers = findBarriers(levels);
    if (barriers.length<2) return 0;

    let totalCapacity = 0;
    let binCounter = 0;
    let binMaxHeight = 0;

    for (let i=0; i < levels.length; i++){
        if (barriers.includes(i)){
            let leftBarrier = levels[barriers[binCounter]];
            let rightBarrier = levels[barriers[binCounter+1]];
            binMaxHeight = getBinMaxHeight(leftBarrier, rightBarrier);
            binCounter++;
        }else {
            let levelCapacity = getLevelCapacity(levels[i],binMaxHeight);
            totalCapacity += levelCapacity;
        }
    }
    return totalCapacity;
}


function getLevelCapacity (level, binCapacity) {
    if (level < binCapacity) return binCapacity-level;
    else return 0;
}


function getBinMaxHeight (leftBarrier, rightBarrier){
    return Math.min(leftBarrier, rightBarrier);
}


function findBarriers (levels) {
    //додаємо нульовий рівень на початку та в кінці, щоб перший та останній рівні могли бути опрацьованими в циклі
    levels.unshift(0);
    levels.push(0);

    let barriers = [];
    let lastBarrierHeight = 0;
    let barrierCandidates = [];

    for (let i=1; i < levels.length; i++){
        let previousLevel = levels[i-1];
        let currentLevel = levels[i];
        let nextLevel = levels[i+1];
        if (currentLevel >= previousLevel && currentLevel > nextLevel){
            if (currentLevel > lastBarrierHeight){
                barriers.push(i);
                lastBarrierHeight = currentLevel;
                barrierCandidates = [];
            }else {
                barrierCandidates = barrierCandidates.filter(
                    (candidate)=>levels[candidate]>currentLevel
                )
                barrierCandidates.push(i)
            }
        }
    }
    if(barrierCandidates.length>0){
        barriers = barriers.concat(barrierCandidates)
    }
    return barriers;
}
