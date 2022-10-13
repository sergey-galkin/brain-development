import React, { useState } from 'react'
import { useTransition, animated } from '@react-spring/web'

const AnimateWrapper = ({Page}) => {
  console.log(Page)
  const [show, setShow] = useState(true);
  useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  // const Clone = React.cloneElement(children, {animateUnmount: () => setShow(false)})

  return (
    <animated.div>
      { show && 
        <Page animateUnmount={() => setShow(false)} /> 
      }
    </animated.div>
  )
}

// const AnimatedPage = ({ children }) => {
//   const [show, setShow] = useState(true);
//   useTransition(show, {
//     from: { opacity: 0 },
//     enter: { opacity: 1 },
//     leave: { opacity: 0 },
//   })

//   const Clone = React.cloneElement(children, {animateUnmount: () => setShow(false)})

//   return (
//     <animated.div>
//       { show && <Clone /> }
//     </animated.div>
//   )
// }

const AnimatedPage = ({ children }) => {
  const [show, setShow] = useState(true);
  const transition = useTransition(show, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 500,
    }
  })

  const animate = {
    mount: () => setShow(true),
    unmount: () => setShow(false),
  }
  const Clone = React.cloneElement(children, {animate})
  console.log(show)
  return transition((styles, show) =>
    show &&
    <animated.div style={styles}>
      {React.cloneElement(children, {animate})}
    </animated.div>
  )
}

// const AnimatedPage = (Page) => React.cloneElement(AnimateWrapper, {Page: Page})

export default AnimatedPage
// export default (Page) => () => <AnimatedPage children={Page}/>
// export default AnimateWrapper