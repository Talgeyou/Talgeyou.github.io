let calculateAttackDV = function (characterAttack, artifactAttack) {
    if (characterAttack === 0) {
        return 0;
    }
    let attackDV = artifactAttack / characterAttack * 100;
    return attackDV;
}

let calculateAttackPercentageDV = function (characterBaseAttack, characterAttack, artifactAttackPercentage) {
    if (characterAttack === 0) {
        return 0;
    }
    let attackPercentageDV = artifactAttackPercentage * characterBaseAttack / characterAttack;
    return attackPercentageDV;

}

let calculatePhysicalDamageBonusDV = function (characterPhysicalDamage, characterPhysicalDamageProportion, artifactPhysicalDamage) {
    if (characterPhysicalDamageProportion === 0) {
        return 0;
    }
    let physicalDamageBonusDV = artifactPhysicalDamage / (100 + characterPhysicalDamage) * (characterPhysicalDamageProportion / 100) * 100;
    return physicalDamageBonusDV;
}

let calculateElementalDamageBonusDV = function (characterElementalDamage, characterElementalDamageProportion, artifactElementalDamage) {
    if (characterElementalDamageProportion === 0) {
        return 0;
    }
    let elementalDamageBonusDV = artifactElementalDamage / (100 + characterElementalDamage) * (characterElementalDamageProportion / 100) * 100;
    return elementalDamageBonusDV;
}

let calculateCritDV = function (characterCritRate, characterCritDamage, artifactCritRate, artifactCritDamage) {
    let critDV = (((1 - (characterCritRate + artifactCritRate) / 100)
                + (characterCritRate + artifactCritRate) / 100 * (100 + artifactCritDamage + characterCritDamage) / 100)
                - ((1 - characterCritRate / 100) + characterCritRate / 100 * (100 + characterCritDamage) / 100))
                / ((1 - characterCritRate / 100) + characterCritRate / 100 * (100 + characterCritDamage) / 100) * 100;
    return critDV;
}

let calculateDV = function (numberOfArtifact) {
    if (+numberOfArtifact === 0) {
        calculateDV(1);
        calculateDV(2);
        calculateDV(3);
    }
    else {
        let character = {
            baseAttack: +document.getElementById("baseAttackInput").value,
            bonusAttack: +document.getElementById("bonusAttackInput").value,
            physicalDamage: +document.getElementById("physicalDamageBonusInput").value,
            physicalDamageProportion: +document.getElementById("physicalDamageProportionInput").value,
            elementalDamage: +document.getElementById("elementalDamageBonusInput").value,
            elementalDamageProportion: +document.getElementById("elementalDamageProportionInput").value,
            critRate: +document.getElementById("critRateInput").value,
            critDamage: +document.getElementById("critDamageInput").value,                        
        };
        character.totalAttack = character.baseAttack + character.bonusAttack;
        
        let artifact = {
            attack: +document.getElementById(`artifact${numberOfArtifact}AttackInput`).value,
            attackPercentage: +document.getElementById(`artifact${numberOfArtifact}AttackPercentageInput`).value,
            physicalDamage: +document.getElementById(`artifact${numberOfArtifact}PhysicalDamageBonusInput`).value,
            elementalDamage: +document.getElementById(`artifact${numberOfArtifact}ElementalDamageBonusInput`).value,
            critRate: +document.getElementById(`artifact${numberOfArtifact}CritRateInput`).value,
            critDamage: +document.getElementById(`artifact${numberOfArtifact}CritDamageInput`).value,
        }

        console.log([character, artifact]);

        let attackDV = calculateAttackDV(character.totalAttack, artifact.attack);
        let attackPercentageDV = calculateAttackPercentageDV(character.baseAttack, character.totalAttack, artifact.attackPercentage);
        let physicalDamageBonusDV = calculatePhysicalDamageBonusDV(character.physicalDamage, character.physicalDamageProportion, artifact.physicalDamage);
        let elementalDamageBonusDV = calculateElementalDamageBonusDV(character.elementalDamage, character.elementalDamageProportion, artifact.elementalDamage);
        let critDV = calculateCritDV(character.critRate, character.critDamage, artifact.critRate, artifact.critDamage);

        console.log([attackDV, attackPercentageDV, physicalDamageBonusDV, elementalDamageBonusDV, critDV]);

        let dv = attackDV + attackPercentageDV + physicalDamageBonusDV + elementalDamageBonusDV + critDV;
        dv = Math.round(dv * 100) / 100;
        document.getElementById("damageValue" + String(numberOfArtifact)).innerHTML = `${dv}%`;
    }

    let elements = [
        document.getElementById("damageValue1"),
        document.getElementById("damageValue2"),
        document.getElementById("damageValue3"),
    ]; 

    let dvs = []

    elements.forEach(element => {
        let value = +element.innerHTML.slice(0, -1);
        Number.isNaN(value) ? dvs.push(0) : dvs.push(+value);
    });

    for (let i = 0; i < elements.length; i++) {
        e = elements[i];
        
        if (dvs[i] === Math.max(...dvs)) {
            e.classList.remove("bg-dark");
            e.classList.remove("bg-danger");
            e.classList.add("bg-success");
        } else if (dvs[i] === Math.min(...dvs)) {
            e.classList.remove("bg-dark");
            e.classList.add("bg-danger");
            e.classList.remove("bg-success");
        } else {
            e.classList.add("bg-dark");
            e.classList.remove("bg-danger");
            e.classList.remove("bg-success");
        }
    }
};