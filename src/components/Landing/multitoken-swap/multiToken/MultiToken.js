import VideoButton from '../../../PortfolioPage/Map/Sidebar/Elements/VideoButton'
import VideoModal from '../../../PortfolioPage/Map/Sidebar/Elements/VideoModal'
import * as styles from './multi-token.module.scss'
import React, { useState } from 'react'
import Picture from '../picture'
import Btn from '../btn'
import clsx from 'clsx'

const MultiToken = ({
  title,
  subTitle,
  text,
  btnLabel,
  btnLink,
  disableImage,
  youtubeCode,
  hasSideImage,
  videoFirst,
}) => {
  const videoUrl = 'https://www.youtube-nocookie.com/embed/' + youtubeCode
  const thumbnailUrl = `https://i3.ytimg.com/vi/${youtubeCode}/maxresdefault.jpg`
  const [videoEmbedUrl, setVideoEmbedUrl] = useState(null)

  return (
    <section className={clsx(styles.multiToken, { show: videoEmbedUrl })}>
      {!disableImage && (
        <Picture
          src="/images/landing/multitoken-swap/multi-token.png"
          alt="Swap multiple tokens to one, in a single transaction"
          width={820}
          height={463}
          className={styles.img}
        />
      )}

      {hasSideImage && (
        <>
          <Picture
            src="/images/landing/multitoken-swap/multitoken-side-image-left.png"
            alt="Swap multiple tokens to one, in a single transaction"
            width={363}
            height={692}
            className={styles.sideImageLeft}
          />
          <Picture
            src="/images/landing/multitoken-swap/multitoken-side-image-right.png"
            alt="Swap multiple tokens to one, in a single transaction"
            width={393}
            height={903}
            className={styles.sideImageRight}
          />
        </>
      )}

      {videoFirst && youtubeCode && (
        <div className={clsx(styles.videoButton, styles.img)}>
          <VideoButton
            posterImage={thumbnailUrl}
            onClick={() => setVideoEmbedUrl(videoUrl)}
          />
        </div>
      )}

      {title && <h2>{title}</h2>}
      {subTitle && <h3>{subTitle}</h3>}

      {text && <p>{text}</p>}

      {!videoFirst && youtubeCode && (
        <div className={styles.videoButton}>
          <VideoButton
            posterImage={thumbnailUrl}
            onClick={() => setVideoEmbedUrl(videoUrl)}
          />
        </div>
      )}

      {btnLink && btnLabel && (
        <Btn
          href={btnLink}
          target="_blank"
          rel="noopener noreferrer"
          white={true}
          className={styles.btn}
        >
          {btnLabel}
        </Btn>
      )}

      {videoEmbedUrl && (
        <VideoModal
          embedUrl={videoEmbedUrl}
          setVideoEmbedUrl={setVideoEmbedUrl}
        />
      )}
    </section>
  )
}

export default MultiToken
