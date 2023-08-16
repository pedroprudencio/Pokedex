import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testando o componente NotFound.tsx', () => {
  test('A página contém um heading h2 com o texto Page requested not found:', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', { name: /page requested not found/i });
    expect(heading).toBeInTheDocument();
  });

  test('A página mostra a imagem com o texto alternativo:', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByAltText(
      /clefairy pushing buttons randomly with text i have no idea what i'm doing/i,
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      '/404.gif',
    );
  });
});
