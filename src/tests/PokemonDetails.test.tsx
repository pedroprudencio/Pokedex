import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testando o componente PokemonDetails.tsx', () => {
  const route = '/pokemon/25';
  const renderPokemonDetails = () => renderWithRouter(<App />, { route });

  test('Exibe informações detalhadas do Pokémon', async () => {
    renderPokemonDetails();
    const [informaçoesPokemon, indiceDetalhado, paragrafoIndice] = [`${pokemonList[0].name} Details`, 'Summary', /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i];
    expect(screen.getByRole('heading', { name: informaçoesPokemon })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: indiceDetalhado })).toBeInTheDocument();
    expect(screen.getByText(paragrafoIndice)).toBeInTheDocument();
  });

  test('Exibe onde acha o Pokémon', () => {
    renderPokemonDetails();
    const esconderijoDoPokemon = `Game Locations of ${pokemonList[0].name}`;
    const local = screen.getAllByRole('img', { name: `${pokemonList[0].name} location` });
    expect(screen.getByRole('heading', { name: esconderijoDoPokemon, level: 2 })).toBeInTheDocument();
    expect(local.length).toBeGreaterThan(1);
    local.forEach((location, index) => {
      expect(location).toBeInTheDocument();
      const { map } = pokemonList[0].foundAt[index];
      expect(location).toHaveAttribute('src', map);
      expect(location).toHaveAttribute('alt', `${pokemonList[0].name} location`);
    });
  });

  test('Permite favoritar um Pokémon', async () => {
    renderPokemonDetails();
    const iconeFavorito = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(iconeFavorito).toBeInTheDocument();
    await userEvent.click(iconeFavorito);
    const imgFavorita = screen.getByAltText(`${pokemonList[0]
      .name} is marked as favorite`);
    expect(imgFavorita).toBeInTheDocument();
  });
});
