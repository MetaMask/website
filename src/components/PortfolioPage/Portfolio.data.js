export const pageData = {
  intro: {
    headline: 'Explore the world of MetaMask Portfolio',
    description:
      'Experience the power of real-time market data, secure providers, and an intuitive interface that empowers you to track, buy, swap, bridge, and stake digital assets all in one easy to use place. With these powerful features, you can track and manage your web3 everything. ',
    ctaLabel: 'Enter',
  },

  instructions: {
    step1: {
      title: 'Learn about<br />MetaMask Portfolio',
      description:
        'MetaMask Portfolio is your home base as you explore the web3 world of boundless potential. The all-in-one dapp gives you seamless control of your digital assets so you spend less time organizing tabs and wallets and more time exploring the ever-expanding world of web3. With MetaMask Portfolio, you can effortlessly manage and track your web3 everything, all in one place.',
      ctaLabel: 'Next',
    },
    step2: {
      title: 'Drag the map<br />to explore',
      ctaLabel: 'Next',
    },
    step3: {
      title: 'Scroll to zoom<br />in and out',
      titleMobile: 'Pinch to zoom<br />in and out',
      ctaLabel: 'Get started',
    },
  },

  header: {
    rightCta: {
      label: 'Try Portfolio',
      href: 'https://portfolio.metamask.io/',
    },
  },

  features: [
    {
      name: 'Dashboard',
      markerLabel: 'Learn more about Dashboard',
      markerMobileAlignment: 'center',
      color: '#ffe466',
      riveIcon: '/images/portfolio/rive-icons/dashboard-v2.riv',
      detailPage: [
        {
          title: 'Dashboard',
          subtitle: `Finally, you won’t need 10 tabs open to manage web3 assets across networks and protocols. The MetaMask Portfolio dashboard allows you to track your crypto journey in one place.`,
          description: `The dashboard gives you a crystal clear view of everything you hold in your wallets, along with all your transactions. Stay one step ahead of trends and innovations so you can map your next move with insights into everything you own in your portfolio. Shift seamlessly between network views, track multiple wallets, and watch assets you’re interested in. Tap between tokens, NFTs, and transactions to get a clear view of everywhere you’ve been, and everything you’ve gathered along the way. Think of the dashboard as your own personal control panel of your web3 journey.`,
          logos: null,
          video: {
            title: 'Dashboard Feature tutorial',
            posterImage: '/images/portfolio/video-poster.jpg',
            embedUrl: 'https://www.youtube.com/embed/XWPizSkhFp4',
          },
          links: {
            title: 'Additional resources',
            list: [
              {
                label: 'Getting started with the MetaMask Portfolio dashboard',
                url:
                  'https://support.metamask.io/hc/en-us/articles/8324480160539-Getting-started-with-the-MetaMask-Portfolio-dashboard',
                newTab: true,
              },
              {
                label: 'How to import a token in MetaMask Portfolio',
                url:
                  'https://support.metamask.io/hc/en-us/articles/8324697607835-How-to-import-a-token-in-MetaMask-Portfolio',
                newTab: true,
              },
              {
                label: 'How to watch a token in MetaMask Portfolio',
                url:
                  'https://support.metamask.io/hc/en-us/articles/8324356266907-How-to-watch-a-token-in-MetaMask-Portfolio',
                newTab: true,
              },
              {
                label: 'How to watch an account in MetaMask Portfolio',
                url:
                  'https://support.metamask.io/hc/en-us/articles/8324454669339-How-to-watch-an-account-in-MetaMask-Portfolio',
                newTab: true,
              },
            ],
          },
        },
      ],
    },

    {
      name: 'Buy & Sell',
      markerLabel: 'Learn more about Buy & Sell',
      markerMobileAlignment: 'right',
      color: '#75c4fd',
      riveIcon: '/images/portfolio/rive-icons/buy-v2.riv',
      detailPage: [
        {
          title: 'Buy',
          subtitle: `The buy feature gives you the power to instantly convert your money into crypto through top providers, vetted through MetaMask. Long wait times are over. With the buy feature, you can convert fiat to crypto instantly. Embrace the speed and convenience of our direct on-ramp.`,
          description: `No matter your experience level, our instant fiat-to-crypto conversion feature opens up a world of possibilities, allowing you to swiftly enter the exciting realm of web3 and continue on your journey with confidence. Effortlessly convert your fiat currency into a diverse range of cryptocurrencies instantly, without leaving the dapp.
          <br /><br />
          The buy feature allows you to directly on-ramp your fiat onto 13 different networks, and multiple options of tokens to on-ramp into for each network. You can avoid the fees and wait times that come with bridging by purchasing tokens directly onto layer 2 networks.`,
          logos: [
            {
              title: 'Providers:',
              list: [
                {
                  label: 'Banxa',
                  icon: '/images/portfolio/sidebar-icons/banxa.svg',
                },
                {
                  label: 'MoonPay',
                  icon: '/images/portfolio/sidebar-icons/moonpay.svg',
                },
                {
                  label: 'Transak',
                  icon: '/images/portfolio/sidebar-icons/transak.svg',
                },
                {
                  label: 'PayPal',
                  icon: '/images/portfolio/sidebar-icons/paypal.svg',
                },
                {
                  label: 'Sardine',
                  icon: '/images/portfolio/sidebar-icons/sardine.svg',
                },
                {
                  label: 'Mercuryo',
                  icon: '/images/portfolio/sidebar-icons/mercuryo.png',
                },
                {
                  label: 'Onramp.money',
                  icon: '/images/portfolio/sidebar-icons/onramp-money.png',
                },
              ],
            },
          ],
          video: {
            title: 'Buy Feature tutorial',
            posterImage: '/images/portfolio/video-poster.jpg',
            embedUrl: 'https://www.youtube.com/embed/OtoymxLYQYU',
          },
        },
        {
          title: 'Sell',
          subtitle: `The sell feature enables you to convert your crypto to cold hard fiat in a flash. Similar to the buy feature’s capabilities, sell uses an aggregator of providers, so you can sell your crypto in an accessible, fast, and secure way while also getting competitive quotes, every time.`,
          description: `Streamlined selling means fewer intermediaries and faster fiat. In a few smooth steps, your funds will be sent to the bank account of your choice.
          <br /><br />
          The sell feature is currently available in the US, UK, and Europe initially supporting ETH on Ethereum mainnet, with plans to expand to native gas tokens on layer 2 networks soon.`,
          icon: '/images/portfolio/rive-icons/sell-icon.svg',
          logos: [
            {
              title: 'Providers:',
              list: [
                {
                  label: 'MoonPay',
                  icon: '/images/portfolio/sidebar-icons/moonpay.svg',
                },
                {
                  label: 'Transak',
                  icon: '/images/portfolio/sidebar-icons/transak.svg',
                },
              ],
            },
          ],
          video: {
            title: 'Sell Feature tutorial',
            posterImage: '/images/portfolio/video-poster.jpg',
            embedUrl: 'https://www.youtube.com/embed/IDoCq5vKCBQ',
          },
          links: {
            title: 'Additional resources',
            list: [
              {
                label: 'Buying crypto with MetaMask Portfolio',
                url:
                  'https://support.metamask.io/hc/en-us/articles/360058239311',
                newTab: true,
              },
              {
                label:
                  'How to sell your crypto assets for fiat currency in MetaMask',
                url:
                  'https://support.metamask.io/hc/en-us/articles/18118120641947-How-to-sell-your-crypto-assets-for-fiat-currency-in-MetaMask',
                newTab: true,
              },
            ],
          },
        },
      ],
    },

    {
      name: 'Swap',
      markerLabel: 'Learn more about Swap',
      markerMobileAlignment: 'center',
      color: '#86e29b',
      riveIcon: '/images/portfolio/rive-icons/swap-v2.riv',
      detailPage: [
        {
          title: 'Swap',
          subtitle: `Swap tokens in the same place you track and manage assets - it just makes sense. Optimize for what matters to you, whether that be speed, price, or swapping via decentralized exchanges. The swap feature serves up ecosystem-wide quotes in seconds. Swap tokens, any time, all in one place.`,
          description: `The MetaMask Portfolio swap feature gives you the simplicity and ease that you’d get on a centralized exchange while still using decentralized, web3-native protocols to swap. The swap feature aggregates quotes from top DEXs to give you the available prices while giving you slippage protection as well. Whether you’re in a rush or avoiding high transaction fees, you decide the right swap for you.
          <br /><br />
          Swap any token across six networks, including Ethereum, Optimism, Arbitrum, Polygon, BNB Smart Chain and Avalanche Chain. Fine tune your swap to specify slippage, so you get the transaction tailored to your needs, every time, aggregated directly from trusted, decentralized providers. 
          `,
          logos: [
            {
              title: 'Supported networks:',
              list: [
                {
                  label: 'Ethereum mainnet',
                  icon:
                    '/images/portfolio/sidebar-icons/ethereum-eth-logo-diamond-purple.svg',
                },
                {
                  label: 'Avalanche C-Chain',
                  icon:
                    '/images/portfolio/sidebar-icons/avalanche-avax-logo.svg',
                },
                {
                  label: 'Polygon',
                  icon:
                    '/images/portfolio/sidebar-icons/polygon-matic-logo.svg',
                },
                {
                  label: 'Optimism',
                  icon:
                    '/images/portfolio/sidebar-icons/optimism-ethereum-op-logo.svg',
                },
                {
                  label: 'Arbitrum',
                  icon: '/images/portfolio/sidebar-icons/arbitrum-arb-logo.svg',
                },
                {
                  label: 'BNB Smart Chain',
                  icon: '/images/portfolio/sidebar-icons/bnb-bnb-logo.svg',
                },
              ],
            },
          ],
          video: {
            title: 'Swap Feature tutorial',
            posterImage: '/images/portfolio/video-poster.jpg',
            embedUrl: 'https://www.youtube.com/embed/q9uG6Ra-w54',
          },
          links: {
            title: 'Additional resources',
            list: [
              {
                label: 'Swaps user guide',
                url:
                  'https://support.metamask.io/hc/en-us/articles/4405093054363-User-Guide-Swaps',
                newTab: true,
              },
              {
                label: 'Why are some tokens missing from MetaMask Swaps?',
                url:
                  'https://support.metamask.io/hc/en-us/articles/360059004712-Why-are-some-tokens-missing-from-MetaMask-Swaps-',
                newTab: true,
              },
              {
                label: 'Where does MetaMask source the token’s price?',
                url:
                  'https://support.metamask.io/hc/en-us/articles/360058057471-Where-does-MetaMask-source-the-token-s-price-',
                newTab: true,
              },
            ],
          },
        },
      ],
    },

    {
      name: 'Bridge',
      markerLabel: 'Learn more about Bridge',
      markerMobileAlignment: 'right',
      color: '#ffafea',
      riveIcon: '/images/portfolio/rive-icons/bridge-v2.riv',
      detailPage: [
        {
          title: 'Bridge',
          subtitle: `The bridge feature in MetaMask Portfolio pulls together bridging quotes from the top protocols in the ecosystem, giving you a boost of speed and efficiency on your journey between networks. Pick the quote that's best for you and move your funds to the network you need without ever leaving the dApp.`,
          description: `Bridge gives you the power to hop from network to network, whether you want to explore base layers like Ethereum, Avalanche, and BNB, or experiment with the ever-expanding world of Layer 2 networks. Discover new ecosystems on other base chains, or enjoy the faster, cheaper transactions on popular Layer 2 rollups. Whatever you’re doing on other blockchains, from diving into DeFi or collecting NFTs, the bridge feature allows effortless token transfers. Keep racing ahead without ever running out of gas. 
          <br /><br />
          You can bridge between the six supported chains using native tokens or stablecoins like USDC, USDT, and DAI. Quotes are generated by aggregating results from four decentralized bridge protocols.
          `,
          logos: [
            {
              title: 'Supported networks:',
              list: [
                {
                  label: 'Ethereum mainnet',
                  icon:
                    '/images/portfolio/sidebar-icons/ethereum-eth-logo-diamond-purple.svg',
                },
                {
                  label: 'BNB Smart Chain',
                  icon: '/images/portfolio/sidebar-icons/bnb-bnb-logo.svg',
                },
                {
                  label: 'Avalanche C-Chain',
                  icon:
                    '/images/portfolio/sidebar-icons/avalanche-avax-logo.svg',
                },
                {
                  label: 'Polygon',
                  icon:
                    '/images/portfolio/sidebar-icons/polygon-matic-logo.svg',
                },
                {
                  label: 'Optimism',
                  icon:
                    '/images/portfolio/sidebar-icons/optimism-ethereum-op-logo.svg',
                },
                {
                  label: 'Arbitrum',
                  icon: '/images/portfolio/sidebar-icons/arbitrum-arb-logo.svg',
                },
              ],
            },
            {
              title: 'Bridge protocols:',
              list: [
                {
                  label: 'Hop',
                  icon: '/images/portfolio/sidebar-icons/hop.svg',
                },
                {
                  label: 'Celer cBridge',
                  icon: '/images/portfolio/sidebar-icons/celer.svg',
                },
                {
                  label: 'Polygon PoS Bridge',
                  icon:
                    '/images/portfolio/sidebar-icons/polygon-matic-logo.svg',
                },
                {
                  label: 'Connext',
                  icon: '/images/portfolio/sidebar-icons/connext.svg',
                },
              ],
            },
          ],
          video: {
            title: 'Bridge Feature tutorial',
            posterImage: '/images/portfolio/video-poster.jpg',
            embedUrl: 'https://www.youtube.com/embed/r1rwvBWk5XU',
          },
          links: {
            title: 'Additional resources',
            list: [
              {
                label: 'How to use the bridge',
                url:
                  'https://support.metamask.io/hc/en-us/articles/10055915089819-How-to-use-the-bridge',
                newTab: true,
              },
              {
                label: 'How are bridge fees calculated?',
                url:
                  'https://support.metamask.io/hc/en-us/articles/10056707767963-How-are-bridge-fees-calculated-',
                newTab: true,
              },
              {
                label: 'What happens when I initiate a transfer on a bridge?',
                url:
                  'https://support.metamask.io/hc/en-us/articles/10055615871643-What-happens-when-I-initiate-a-transfer-on-a-bridge-',
                newTab: true,
              },
              {
                label: 'Connectivity with Blockchain Bridges',
                url:
                  'https://learn.metamask.io/lessons/bridging-blockchain-networks',
                badge: {
                  label: 'MetaMask Learn',
                  gradient: { from: '#FCEFE3', to: '#75C4FD' },
                },
                newTab: true,
              },
            ],
          },
        },
      ],
    },

    {
      name: 'Stake',
      markerLabel: 'Learn more about Stake',
      markerMobileAlignment: 'center',
      color: '#f5841f',
      riveIcon: '/images/portfolio/rive-icons/stake-v2.riv',
      mapCoordX: '47%',
      mapCoordY: '20%',
      detailPage: [
        {
          title: 'Stake',
          subtitle: `The stake feature in MetaMask Portfolio gathers staking rates and rewards from various trusted providers, ensuring that you maximize your staking potential. In a few simple steps, you can stake your Ethereum and MATIC securely and effortlessly, while benefiting from the most competitive staking rates available.`,
          description: `Since the Shapella upgrade of the Ethereum network to proof-of-stake, interest in staking has increased. Now, you can instantly stake your Ethereum and MATIC using decentralized providers within MetaMask Portfolio. No longer limited to a single provider, you can diversify your staking strategy and optimize your rewards without the long wait times or complicated navigation of browsing through different providers. Stake and unstake with multiple providers, collect rewards, and browse rates and options, all in one place.`,
          logos: [
            {
              title: 'Staking providers:',
              list: [
                {
                  label: 'Lido',
                  icon: '/images/portfolio/sidebar-icons/lido.svg',
                },
                {
                  label: 'Rocket Pool',
                  icon: '/images/portfolio/sidebar-icons/rocketpool.png',
                },
                {
                  label: 'Stader Labs',
                  icon: '/images/portfolio/sidebar-icons/stader.svg',
                },
              ],
            },
          ],
          video: {
            title: 'Stake Feature tutorial',
            posterImage: '/images/portfolio/video-poster.jpg',
            embedUrl: 'https://www.youtube.com/embed/xn8XX00T1E4',
          },
          links: {
            title: 'Additional resources',
            list: [
              {
                label: 'What is staking?',
                url:
                  'https://support.metamask.io/hc/en-us/articles/11834624323099-What-is-staking-',
                newTab: true,
              },
              {
                label: 'What happens to my ETH when I stake through MetaMask?',
                url:
                  'https://support.metamask.io/hc/en-us/articles/11834604093851-What-happens-to-my-ETH-when-I-stake-through-MetaMask-',
                newTab: true,
              },
              {
                label: 'What are the risks using MetaMask staking?',
                url:
                  'https://support.metamask.io/hc/en-us/articles/12085210973211-What-are-the-risks-of-using-MetaMask-Staking-',
                newTab: true,
              },
              {
                label: 'What can I stake with MetaMask staking?',
                url:
                  'https://support.metamask.io/hc/en-us/articles/11834574786971-What-can-I-stake-with-MetaMask-Staking-',
                newTab: true,
              },
              {
                label: 'Staking, a Public Good',
                url: 'https://learn.metamask.io/lessons/what-is-staking',
                badge: {
                  label: 'MetaMask Learn',
                  gradient: { from: '#E3FCE9', to: '#FCEFE3' },
                },
                newTab: true,
              },
            ],
          },
        },
      ],
    },
  ],

  footer: {
    cta: {
      label: 'Visit MetaMask Portfolio',
      link: 'https://portfolio.metamask.io/',
    },
    copyright: '©2023 MetaMask • A ConsenSys Formation',
    navigation: [
      {
        heading: 'Share',
        items: [
          {
            label: 'Twitter',
            link: 'https://twitter.com/MetaMask',
            newTab: true,
          },
          {
            label: 'Instagram',
            link: 'https://www.instagram.com/metamask.io/',
            newTab: true,
          },
          {
            label: 'TikTok',
            link: 'https://www.tiktok.com/@metamask',
            newTab: true,
          },
          { label: 'Contact Us', link: '/', newTab: true },
        ],
      },
      {
        heading: 'Connect',
        items: [
          {
            label: 'Support',
            link: 'https://support.metamask.io/',
            newTab: true,
          },
          {
            label: 'Community',
            link: 'https://community.metamask.io/',
            newTab: true,
          },
          {
            label: 'Developers',
            link: 'https://docs.metamask.io/',
            newTab: true,
          },
          { label: 'Newsletter', link: '/', newTab: true },
        ],
      },
      {
        heading: 'Learn more',
        items: [
          { label: 'News', link: '/news/', newTab: true },
          {
            label: 'MM Learn',
            link: 'https://learn.metamask.io/overview',
            newTab: true,
          },
        ],
      },
      {
        heading: 'Legal',
        items: [
          {
            label: 'Terms',
            link: 'https://consensys.net/terms-of-use/',
            newTab: true,
          },
          {
            label: 'Privacy Policy',
            link: 'https://consensys.net/privacy-policy/',
            newTab: true,
          },
        ],
      },
    ],
  },
}
