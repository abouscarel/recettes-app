import React from 'react'

import { ColorContext } from './Color';

const Header = ({ pseudo }) => {
  
  // Add "d'" instead of de for pseudo start with 'aeiouy'
  const formatPseudo = pseudo => /[aeiouy]/i.test(pseudo[0]) ? `d'${pseudo}` : `de ${pseudo}`

  return (
    <ColorContext.Consumer>
      { context => (
          <header style={{backgroundColor: context.state.color}}>
            <h1>La boîte à recettes de {formatPseudo(pseudo)}</h1>
          </header>
        )
      }
    </ColorContext.Consumer>
    
  )
}

export default Header