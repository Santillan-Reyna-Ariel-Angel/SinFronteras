import React from 'react';
//MUI:
//Styles:
import {
  Background,
  HeaderContainer,
  HeaderTitle,
  BodyContainer,
  // CardsBody,
} from './BusListStyles';
//Contexts:
//Firebase Functions:
//States:
//Components:
import { BusCard } from './BusCard/BusCard';
//Others:

export const BusList = () => {
  return (
    <>
      <Background>
        <HeaderContainer>
          <HeaderTitle>
            {/* Lista de buses: */}
            <span>BUSES EN SUCURSAL</span>
          </HeaderTitle>
        </HeaderContainer>

        <BodyContainer>
          <BusCard />
        </BodyContainer>
      </Background>
    </>
  );
};
