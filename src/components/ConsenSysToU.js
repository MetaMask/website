import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import consensysData from '../lib/api/consensys/getData'
import Loading from './Loading'

const ConsenSysToU = ({ pageId }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState('')
  const [headerData, setHeaderData] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    consensysData
      .getToU(pageId, {
        _fields: 'id,title,modules.rich-text,header_component',
      })
      .then(response => {
        try {
          if (response && response.modules?.length) {
            const { content } = response.modules[0].children[0].config
            const { title, description } = response.header_component[0]?.config
            setData(content)
            setHeaderData({ title, description })
            setLoading(false)
            return
          }
          setLoading(false)
        } catch (error) {
          setLoading(false)
        }
      })
  }, [])

  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1
            className="title"
            dangerouslySetInnerHTML={{ __html: headerData.title || 'Terms of use' }}
          />
          <h2
            className="description"
            dangerouslySetInnerHTML={{ __html: headerData.description || 'Last Updated: ' }}
          />
          <div dangerouslySetInnerHTML={{ __html: data || 'No Data' }} />
        </>
      )}
    </Wrapper>
  )
}

export default ConsenSysToU

ConsenSysToU.propTypes = {
  pageId: PropTypes.string.isRequired,
}

const Wrapper = styled.div`
  min-height: calc(100vh - 94px);

  h1.title {
    text-align: center;
     & > p {
      margin-bottom: 0;
    }
  }

  h2.description {
    font-weight: 400;
    text-align: center;
    margin-bottom: 32px;
    font-size: 16px;
  }

  h4 {
    margin: 24px 0;
  }
`
