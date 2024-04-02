import React, { useState } from 'react'
import VideoButton from '../../PortfolioPage/Map/Sidebar/Elements/VideoButton'
import VideoModal from '../../PortfolioPage/Map/Sidebar/Elements/VideoModal'
import * as styles from './featureVideo.module.scss'
import clsx from 'clsx'

const FeatureVideo = ({
  bgColor,
  sectionId,
  youtubeCode,
  title,
  description,
}) => {
  const videoUrl = 'https://www.youtube-nocookie.com/embed/' + youtubeCode
  const thumbnailUrl = `https://i3.ytimg.com/vi/${youtubeCode}/maxresdefault.jpg`
  const [videoEmbedUrl, setVideoEmbedUrl] = useState(null)

  return (
    <section
      id={sectionId}
      className={clsx(styles.featureVideo, [styles[bgColor]], {
        show: videoEmbedUrl,
      })}
    >
      <div className={clsx(styles.wrapper, 'wrapper')}>
        <div>
          <VideoButton
            posterImage={thumbnailUrl}
            visible
            onClick={() => setVideoEmbedUrl(videoUrl)}
          />
        </div>
        <div>
          <h3
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
      {videoEmbedUrl && (
        <VideoModal
          embedUrl={videoEmbedUrl}
          setVideoEmbedUrl={setVideoEmbedUrl}
        />
      )}
    </section>
  )
}

export default FeatureVideo
