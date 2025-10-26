import React from 'react';

const BrandSlider: React.FC = () => {
  const brands = [
    { name: 'GUCCI', url: 'https://www.gucci.com' },
    { name: 'PRADA', url: 'https://www.prada.com' },
    { name: 'HERMÈS', url: 'https://www.hermes.com' },
    { name: 'CHANEL', url: 'https://www.chanel.com' },
    { name: 'DIOR', url: 'https://www.dior.com' },
    { name: 'LOUIS VUITTON', url: 'https://www.louisvuitton.com' },
    { name: 'BOTTEGA VENETA', url: 'https://www.bottegaveneta.com' },
    { name: 'THE ROW', url: 'https://www.therow.com' },
    { name: 'BRUNELLO CUCINELLI', url: 'https://www.brunellocucinelli.com' },
    { name: 'MAX MARA', url: 'https://www.maxmara.com' },
    { name: 'SAINT LAURENT', url: 'https://www.ysl.com' },
    { name: 'CELINE', url: 'https://www.celine.com' },
    { name: 'VALENTINO', url: 'https://www.valentino.com' },
    { name: 'GIORGIO ARMANI', url: 'https://www.armani.com' },
    { name: 'VERSACE', url: 'https://www.versace.com' },
    { name: 'STEFANO RICCI', url: 'https://www.stefanoricci.com' },
    { name: 'PEPE JEANS', url: 'https://www.pepejeans.com' },
    { name: 'LEVI\'S', url: 'https://www.levi.com' },
    { name: 'ZARA', url: 'https://www.zara.com' },
    { name: 'H&M', url: 'https://www.hm.com' },
    { name: 'UNIQLO', url: 'https://www.uniqlo.com' },
    { name: 'COS', url: 'https://www.cosstores.com' },
    { name: 'MANGO', url: 'https://shop.mango.com' }
  ];

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <div className="bg-black py-6 overflow-hidden">
      <div className="relative">
        <div className="flex animate-scroll">
          {duplicatedBrands.map((brand, index) => (
            <a
              key={index}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-6 cursor-pointer group transition-all duration-300 hover:scale-105"
            >
              <span className="text-white text-sm font-semibold tracking-wider opacity-70 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap group-hover:text-luxury-300">
                {brand.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;