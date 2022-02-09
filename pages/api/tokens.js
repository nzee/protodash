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
    ],
  });
}
