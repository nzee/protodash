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
      },
    ],
  });
}
