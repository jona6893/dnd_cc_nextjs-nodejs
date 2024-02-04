export function getAC(newAc, onlyAcItems, calculateAC, character) {
  if (onlyAcItems.length === 0) {
    //  console.log("got no armor");
    if (character.stats) {
      if (character?.class?.toLowerCase() === "barbarian") {
        // calculate unarmomred AC 10+dex-mod+con-mod
        calculateAC =
          10 + (character?.stats[1]?.bonus + character?.stats[2]?.bonus);
      } else if (character?.class?.toLowerCase() === "monk") {
        // calculate unarmomred AC 10+dex-mod+wis-mod
        calculateAC =
          10 + (character?.stats[1]?.bonus + character?.stats[4]?.bonus);
      } else {
        // calculate unarmomred AC
        calculateAC = 10 + character?.stats[1]?.bonus;
      }
    }
  } else {
    // get all equipped armor and add togther then add dex modifier.
    //  console.log("got armor");
    let bodyArmor = [];
    let shield = [];

    onlyAcItems.forEach((e) => {
      if (e[1] !== "Shield") {
        bodyArmor.push(e);
      } else {
        shield.push(e);
      }
    });
    //console.log(bodyArmor);
    //console.log(shield.length);

    if (bodyArmor.length > 0) {
      if (bodyArmor[0][0].dex_bonus === true && bodyArmor[0][0].max_bonus) {
        // console.log("max bonus", bodyArmor[0][0]);
        calculateAC += bodyArmor[0][0].base + bodyArmor[0][0].max_bonus;
      }
      // if dex bonus and no max
      else if (
        bodyArmor[0][0].dex_bonus === true &&
        !bodyArmor[0][0].max_bonus
      ) {
        // console.log("bonus", bodyArmor[0][0]);
        calculateAC += bodyArmor[0][0].base + character.stats[1].bonus;
      } else {
        // if no bonus
        calculateAC += bodyArmor[0][0].base;
        // console.log(bodyArmor[0][0].base);
      }
    }
    if (shield.length >= 1 && bodyArmor.length <= 0) {
      if (shield[0][0].dex_bonus === true && shield[0][0].max_bonus) {
        //  console.log("max bonus", shield[0][0]);
        calculateAC = 10 + (shield[0][0].base + shield[0][0].max_bonus);
      }
      // if dex bonus and no max
      else if (shield[0][0].dex_bonus === true && !shield[0][0].max_bonus) {
        // console.log("bonus", shield[0][0]);
        calculateAC = 10 + (shield[0][0].base + character.stats[1].bonus);
      } else {
        // if no bonus
        // console.log("no nothing", shield[0][0]);
        calculateAC = 10 + shield[0][0].base;
      }
    } else if (shield.length >= 1 && bodyArmor.length > 0) {
      if (shield[0][0].dex_bonus === true && shield[0][0].max_bonus) {
        //  console.log("max bonus", shield[0][0]);
        calculateAC += shield[0][0].base + shield[0][0].max_bonus;
      }
      // if dex bonus and no max
      else if (shield[0][0].dex_bonus === true && !shield[0][0].max_bonus) {
        // console.log("bonus", shield[0][0]);
        calculateAC += shield[0][0].base + character.stats[1].bonus;
      } else {
        // if no bonus
        // console.log("no nothing", shield[0][0]);
        calculateAC += shield[0][0].base;
      }
    }
  }
  return calculateAC;
}
