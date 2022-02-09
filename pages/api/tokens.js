export default async function handler(req, res) {
  res.status(200).json({
    tokens: [
      {
        token: "0x959b88966fc5b261df8359961357d34f4ee27b4a",
        chain: "avax",
        chainId: 43114,
        twitter: "univmoney",
        title: "Universe (🌌,🌌) 🔺",
        desc: "Universe $UNIV is an innovative DaaS on #Avalanche. Passive income up to 2,044% APR, NFTs, Sustainability & Metaverse. Founder: @cattyverse",
        slug: "univ",
        pfp: "https://pbs.twimg.com/profile_images/1485280648478797833/f5bEDj8Y_400x400.jpg",
        cover: "https://cdn.tofunft.com/covers/1qkvfy776zb87gi.jpg/1440.png",
        tokenHolders: "13,320+",
      },
      {
        token: "0x7015587f6ed157267d9894c5673c4c0cbd0083f4",
        chain: "matic",
        chainId: 137,
        twitter: "cubo_money",
        title: "Cubo Money",
        desc: "We’re building high-yield, liquidity owning nodes. Join us and create a $CUBO today! ",
        slug: "cubo",
        pfp: "https://pbs.twimg.com/profile_images/1470678308694249472/6Tk117VC_400x400.jpg",
        cover:
          "https://pbs.twimg.com/profile_banners/1467966583964372995/1642527908/1500x500",
        tokenHolders: "3,000+",
      },
      {
        token: "0x83a283641c6b4df383bcddf807193284c84c5342",
        chain: "avax",
        chainId: 43114,
        twitter: "VaporNodes",
        title: "VaporFi",
        desc: "Building a robust #DeFi treasury with your favorite projects. #BAYC #3442 - NaaS protocol @avalanchavax - We pay you 1% per day!",
        slug: "vpnd",
        pfp: "https://pbs.twimg.com/profile_images/1488490135595503616/VsZwN87I_400x400.png",
        cover:
          "https://pbs.twimg.com/profile_banners/1388183620255461385/1643718680/1500x500",
        tokenHolders: "4,500+",
      },
    ],
  });
}
