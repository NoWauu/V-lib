import React from 'react';
import Title from '@/components/atoms/Title';
import Paragraph from '@/components/atoms/Paragraph';
import Container from '@/components/atoms/Container';
import Wrapper from '@/components/wrappers/Wrapper';

export default function AProposPage() {
  return (
    <Wrapper>
      <Container>
        <h1 className="text-4xl font-bold text-center my-8 mt-24">À propos de nous</h1>
        <div className="flex flex-col md:flex-row items-center my-4">
          <div className="md:w-1/2 p-4">
            <Title text="Qui sommes-nous ?" />
            <Paragraph text="Nous sommes cinq étudiants passionnés par le développement et l'innovation." />
            <Paragraph text="Notre équipe est composée de Mathis, Ryan, Téo, Maxime et Mathew." />
            <Paragraph text="Actuellement en 2e année de BUT Informatique, nous avons créé ce projet universitaire pour faciliter la location de vélos en libre-service." />
          </div>
          <div className="md:w-1/2 p-4">
            <img src="/univ.jpg" alt="Image de l'équipe" className="w-3/4 h-auto mx-auto rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse items-center my-4">
          <div className="md:w-1/2 p-4">
            <Title text="Pourquoi Vélib ?" />
            <Paragraph text="Le service Vélib' est un système de vélos en libre-service disponible dans plusieurs villes. Il est devenu un moyen de transport populaire grâce à sa facilité d'accès et son intégration dans la mobilité urbaine." />
            <Paragraph text="Nous avons été sollicités pour développer une application qui permet de gérer les stations Vélib'." />
            <Paragraph text="Notre objectif est de privilégier les emprunts plutôt que les achats, car c'est une solution plus écologique." />
          </div>
          <div className="md:w-1/2 p-4">
            <img src="/velo.jpg" alt="Image écologique" className="w-3/4 h-auto mx-auto rounded-lg" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center my-4">Merci de votre visite et de votre soutien !</h2>
      </Container>
    </Wrapper>
  );
}