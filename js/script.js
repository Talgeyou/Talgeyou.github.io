let calculateAttackDV = function (characterAttack, numberOfArtifact) {
    if (characterAttack === 0) {
        console.log("Attack DV: 0")
        return 0;
    }
    let artifactAttack = +document.getElementById("artifact" + String(numberOfArtifact) + "AttackInput").value;
    let attackDV = artifactAttack / characterAttack * 100;
    console.log("Attack DV: " + attackDV);
    return attackDV;
}

let calculateAttackPercentageDV = function (characterBaseAttack, characterAttack, numberOfArtifact) {
    if (characterAttack === 0) {
        console.log("Attack Percentage DV: 0")
        return 0;
    }
    let artifactPercentageAttack = +document.getElementById("artifact" + String(numberOfArtifact) + "AttackPercentageInput").value;
    let attackPercentageDV = artifactPercentageAttack * characterBaseAttack / characterAttack;
    console.log("Attack Percentage DV: " + attackPercentageDV)
    return attackPercentageDV;

}

let calculatePhysicalDamageBonusDV = function (numberOfArtifact) {
    let physicalDamageProportion = +document.getElementById("physicalDamageProportionInput").value;
    if (physicalDamageProportion === 0) {
        console.log("Physical Damage Bonus DV: 0");
        return 0;
    }
    let characterPhysicalDamageBonus = +document.getElementById("physicalDamageBonusInput").value;
    let artifactPhysicalDamageBonus = +document.getElementById("artifact" + String(numberOfArtifact) + "PhysicalDamageBonusInput").value;
    let physicalDamageBonusDV = artifactPhysicalDamageBonus / (100 + characterPhysicalDamageBonus) * (physicalDamageProportion / 100) * 100;
    console.log("Physical Damage Bonus DV: " + physicalDamageBonusDV);
    return physicalDamageBonusDV;
}

let calculateElementalDamageBonusDV = function (numberOfArtifact) {
    let elementalDamageProportion = +document.getElementById("elementalDamageProportionInput").value;
    if (elementalDamageProportion === 0) {
        console.log("Elemental Damage Bonus DV: 0");
        return 0;
    }
    let characterElementalDamageBonus = +document.getElementById("elementalDamageBonusInput").value;
    let artifactElementalDamageBonus = +document.getElementById("artifact" + String(numberOfArtifact) + "ElementalDamageBonusInput").value;
    let elementalDamageBonusDV = artifactElementalDamageBonus / (100 + characterElementalDamageBonus) * (elementalDamageProportion / 100) * 100;
    console.log("Elemental Damage Bonus DV: " + elementalDamageBonusDV);
    return elementalDamageBonusDV;
}

let calculateCritDV = function (numberOfArtifact) {
    let characterCritRate = +document.getElementById("critRateInput").value;
    let characterCritDamage = +document.getElementById("critDamageInput").value;
    let artifactCritRate = +document.getElementById("artifact" + String(numberOfArtifact) + "CritRateInput").value;
    let artifactCritDamage = +document.getElementById("artifact" + String(numberOfArtifact) + "CritDamageInput").value;
    let critDV = (((1 - (characterCritRate + artifactCritRate) / 100) + (characterCritRate + artifactCritRate) / 100 * (100 + artifactCritDamage + characterCritDamage) / 100) - ((1 - characterCritRate / 100) + characterCritRate / 100 * (100 + characterCritDamage) / 100)) / ((1 - characterCritRate / 100) + characterCritRate / 100 * (100 + characterCritDamage) / 100) * 100;
    console.log("Crit DV: " + critDV);
    return critDV;
}

let calculateDV = function (numberOfArtifact) {
    if (+numberOfArtifact === 0) {
        calculateDV(1);
        calculateDV(2);
        calculateDV(3);
    }
    else {
        let characterBaseAttack = +document.getElementById("baseAttackInput").value;
        let characterBonusAttack = +document.getElementById("bonusAttackInput").value;
        let characterAttack = characterBaseAttack + characterBonusAttack;
        let attackDV = calculateAttackDV(characterAttack, numberOfArtifact);
        let attackPercentageDV = calculateAttackPercentageDV(characterBaseAttack, characterAttack, numberOfArtifact);
        let physicalDamageBonusDV = calculatePhysicalDamageBonusDV(numberOfArtifact);
        let elementalDamageBonusDV = calculateElementalDamageBonusDV(numberOfArtifact);
        let critDV = calculateCritDV(numberOfArtifact);
        console.log(attackDV + attackPercentageDV + physicalDamageBonusDV + elementalDamageBonusDV + critDV);
        document.getElementById("damageValue" + String(numberOfArtifact)).innerHTML = String(attackDV + attackPercentageDV + physicalDamageBonusDV + elementalDamageBonusDV + critDV) + "%";
    }
};