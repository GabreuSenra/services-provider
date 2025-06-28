import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ImageSourcePropType, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'; // Import ImageSourcePropType

import ServiceCategoryCard from '@/components/ServiceCategoryCard'; // The new card component
import ThemedButton from '@/components/ThemedButton'; // Used for the back button
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { homeStyles } from '@/constants/globalStyle'; // Global styles for container, scrollViewContent, gridContainer

// Import your ServicesData.tsx which exports the array of categories
import servicesData from '@/components/ServicesData'; // Adjust the path if necessary
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';

// Paleta de cores para os cartões de subcategoria
const COLOR_PALETTE = [
  '#FFC107', // Amarelo/Laranja 
  '#4CAF50', // Verde
  '#03A9F4', // Azul Claro
  '#9C27B0', // Roxo
  '#FF5722', // Laranja Avermelhado
  '#795548', // Marrom
  '#607D8B', // Cinza Azulado
  '#E91E63', // Rosa
  '#F44336', // Vermelho
  '#E38C25', // Amarelo
];

/*
// Mapeamento dos IDs das subcategorias para os caminhos das imagens locais
const SUBCATEGORY_ICON_MAP: { [key: string]: ImageSourcePropType } = {
  // --- CasaServices.json ---
  'machista-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'encanador-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'eletricista-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'pintura-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'alvenaria-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'montagem-instalacao-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'marcenaria-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'serralheria-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'gesso-drywall-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'chaveiro-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'vidracaria-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'jardinagem-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'piscinas-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'dedetizacao-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'informatica-redes-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'refrigeracao-climatizacao-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'desentupidor-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'mudancas-transportes-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'limpeza-geral-casa': require('@/assets/images/service-icons/default-service.png'), // Placeholder

  // --- EletronicosServices.json ---
  'conserto-celulares': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'assistencia-computadores': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'instalacao-configuracao': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'conserto-eletrodomesticos': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'eletronicos-geral': require('@/assets/images/service-icons/default-service.png'), // Placeholder

  // --- EventosServices.json ---
  'buffet-alimentacao': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'decoracao-eventos': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'locacao-equipamentos': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'fotografia-filmagem': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'musica-entretenimento': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'organizacao-planejamento': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'estetica-preparacao': require('@/assets/images/service-icons/default-service.png'), // Placeholder

  // --- ModaServices.json ---
  'ajustes-reformas-moda': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'confeccao-sob-medida-moda': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'costura-criativa-moda': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'customizacao-roupas-moda': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'aluguel-roupas-moda': require('@/assets/images/service-icons/default-service.png'), // Placeholder

  // --- PetsServices.json ---
  'veterinarios-clinicas-pets': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'banho-tosa-pets': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'servicos-domicilio-pets': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'adestramento-pets': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'hospedagem-creche-pets': require('@/assets/images/service-icons/default-service.png'), // Placeholder

  // --- SaudeServices.json ---
  'clinicas-medicas-saude': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'consultorios-odontologicos-saude': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'laboratorios-protese-saude': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'analises-clinicas-saude': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'diagnostico-imagem-saude': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'psicologos-saude': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'nutricionista-saude': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'terapias-alternativas-saude': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'fisioterapeuta-saude': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'massoterapia-saude': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'cuidados-pessoais-saude': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'fitness-saude': require('@/assets/images/service-icons/default-service.png'), // Placeholder

  // --- BelezaServices.json ---
  'cabelos-beleza': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'barbearia-beleza': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'estetica-facial-beleza': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'estetica-corporal-beleza': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'unhas-beleza': require('@/assets/images/service-icons/default-service.png'), // Placeholder
  'maquiagem-beleza': require('@/assets/images/service-icons/default-service.png'), // Placeholder

  'default-subcategory': require('@/assets/images/service-icons/default-service.png'), // Ícone padrão para subcategorias não mapeadas
};
*/

const SUBCATEGORY_ICON_MAP: { [key: string]: ImageSourcePropType } = {
  // --- CasaServices.json ---
  'machista-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Ferramentas' },
  'encanador-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Encanador' },
  'eletricista-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Eletricista' },
  'pintura-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Pintura' },
  'alvenaria-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Pedreiro' },
  'montagem-instalacao-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Montagem' },
  'marcenaria-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Marcenaria' },
  'serralheria-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Serralheria' },
  'gesso-drywall-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Gesso' },
  'chaveiro-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Chaveiro' },
  'vidracaria-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Vidro' },
  'jardinagem-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Jardim' },
  'piscinas-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Piscina' },
  'dedetizacao-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Dedetiza' },
  'informatica-redes-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=TI' },
  'refrigeracao-climatizacao-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=AC' },
  'desentupidor-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Desentope' },
  'mudancas-transportes-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Mudança' },
  'limpeza-geral-casa': { uri: 'https://placehold.co/60x60/ADD8E6/000000?text=Limpeza' },

  // --- EletronicosServices.json ---
  'conserto-celulares': { uri: 'https://placehold.co/60x60/FFDDC1/000000?text=Celular' },
  'assistencia-computadores': { uri: 'https://placehold.co/60x60/FFDDC1/000000?text=PC' },
  'instalacao-configuracao': { uri: 'https://placehold.co/60x60/FFDDC1/000000?text=Instala' },
  'conserto-eletrodomesticos': { uri: 'https://placehold.co/60x60/FFDDC1/000000?text=Eletro' },
  'eletronicos-geral': { uri: 'https://placehold.co/60x60/FFDDC1/000000?text=Geral' },

  // --- EventosServices.json ---
  'buffet-alimentacao': { uri: 'https://placehold.co/60x60/D1FFC1/000000?text=Buffet' },
  'decoracao-eventos': { uri: 'https://placehold.co/60x60/D1FFC1/000000?text=Decora' },
  'locacao-equipamentos': { uri: 'https://placehold.co/60x60/D1FFC1/000000?text=Locação' },
  'fotografia-filmagem': { uri: 'https://placehold.co/60x60/D1FFC1/000000?text=Foto' },
  'musica-entretenimento': { uri: 'https://placehold.co/60x60/D1FFC1/000000?text=Música' },
  'organizacao-planejamento': { uri: 'https://placehold.co/60x60/D1FFC1/000000?text=Planeja' },
  'estetica-preparacao': { uri: 'https://placehold.co/60x60/D1FFC1/000000?text=Estética' },

  // --- ModaServices.json ---
  'ajustes-reformas-moda': { uri: 'https://placehold.co/60x60/C1D1FF/000000?text=Costura' },
  'confeccao-sob-medida-moda': { uri: 'https://placehold.co/60x60/C1D1FF/000000?text=SobMedida' },
  'costura-criativa-moda': { uri: 'https://placehold.co/60x60/C1D1FF/000000?text=Criativa' },
  'customizacao-roupas-moda': { uri: 'https://placehold.co/60x60/C1D1FF/000000?text=Customiza' },
  'aluguel-roupas-moda': { uri: 'https://placehold.co/60x60/C1D1FF/000000?text=Aluguel' },

  // --- PetsServices.json ---
  'veterinarios-clinicas-pets': { uri: 'https://placehold.co/60x60/FFC1D1/000000?text=Vet' },
  'banho-tosa-pets': { uri: 'https://placehold.co/60x60/FFC1D1/000000?text=Banho' },
  'servicos-domicilio-pets': { uri: 'https://placehold.co/60x60/FFC1D1/000000?text=Domicílio' },
  'adestramento-pets': { uri: 'https://placehold.co/60x60/FFC1D1/000000?text=Adestra' },
  'hospedagem-creche-pets': { uri: 'https://placehold.co/60x60/FFC1D1/000000?text=Hospeda' },

  // --- SaudeServices.json ---
  'clinicas-medicas-saude': { uri: 'https://placehold.co/60x60/D1FFD1/000000?text=Médico' },
  'consultorios-odontologicos-saude': { uri: 'https://placehold.co/60x60/D1FFD1/000000?text=Dentista' },
  'laboratorios-protese-saude': { uri: 'https://placehold.co/60x60/D1FFD1/000000?text=Prótese' },
  'analises-clinicas-saude': { uri: 'https://placehold.co/60x60/D1FFD1/000000?text=Análise' },
  'diagnostico-imagem-saude': { uri: 'https://placehold.co/60x60/D1FFD1/000000?text=Imagem' },
  'psicologos-saude': { uri: 'https://placehold.co/60x60/D1FFD1/000000?text=Psicólogo' },
  'nutricionista-saude': { uri: 'https://placehold.co/60x60/D1FFD1/000000?text=Nutri' },
  'terapias-alternativas-saude': { uri: 'https://placehold.co/60x60/D1FFD1/000000?text=Terapias' },
  'fisioterapeuta-saude': { uri: 'https://placehold.co/60x60/D1FFD1/000000?text=Fisio' },
  'massoterapia-saude': { uri: 'https://placehold.co/60x60/D1FFD1/000000?text=Massagem' },
  'cuidados-pessoais-saude': { uri: 'https://placehold.co/60x60/D1FFD1/000000?text=Cuidados' },
  'fitness-saude': { uri: 'https://placehold.co/60x60/D1FFD1/000000?text=Fitness' },

  // --- BelezaServices.json ---
  'cabelos-beleza': { uri: 'https://placehold.co/60x60/FFD1D1/000000?text=Cabelo' },
  'barbearia-beleza': { uri: 'https://placehold.co/60x60/FFD1D1/000000?text=Barba' },
  'estetica-facial-beleza': { uri: 'https://placehold.co/60x60/FFD1D1/000000?text=Facial' },
  'estetica-corporal-beleza': { uri: 'https://placehold.co/60x60/FFD1D1/000000?text=Corporal' },
  'unhas-beleza': { uri: 'https://placehold.co/60x60/FFD1D1/000000?text=Unhas' },
  'maquiagem-beleza': { uri: 'https://placehold.co/60x60/FFD1D1/000000?text=Maquiagem' },

  'default-subcategory': { uri: 'https://placehold.co/60x60/CCCCCC/000000?text=Serviço' }, // Ícone padrão para subcategorias não mapeadas
};

// Constantes para o grid de subcategorias
const SUB_NUM_COLUMNS_MOBILE = 2; // 2 colunas para subcategorias -> mobile
const SUB_NUM_COLUMNS_WEB = 4; // 4 colunas para subcategorias -> web
const SUB_ITEM_SPACING = 15; // Espaçamento entre subcategorias


export default function CategoryPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  // 'id' será o ID da categoria (e.g., 'automoveis', 'limpeza')
  // 'categoryName' é o nome passado como um parâmetro da tela anterior (index.tsx)
  const { id, categoryName } = params;

  // Encontra a categoria correspondente no array 'servicesData'
  // O 'id' dos parâmetros da rota corresponde ao campo 'icone' no seu JSON de categoria
  const category = servicesData.find(cat => cat.id === id);

  // Se a categoria não for encontrada, exibe uma mensagem de erro ou redireciona
  if (!category) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText type="title">Categoria não encontrada</ThemedText>
        <ThemedText style={styles.errorText}>A categoria com ID "{id}" não existe ou não está configurada.</ThemedText>
        <ThemedButton title="Voltar para Início" onPress={() => router.replace('/')} />
      </ThemedView>
    );
  }

  // --- Cálculos para o grid de subcategorias ---
  const screenWidth = Dimensions.get('window').width;

  // Calcula a largura disponível para o conteúdo em MOBILE (subtraindo o padding horizontal)
  const subContentWidthMobile = screenWidth - (2 * SUB_ITEM_SPACING);
  // Calcula o tamanho do item para mobile com base no 'gap'
  const subItemWidthMobile = (subContentWidthMobile - (SUB_NUM_COLUMNS_MOBILE - 1) * SUB_ITEM_SPACING) / SUB_NUM_COLUMNS_MOBILE;
  const subItemHeightMobile = subItemWidthMobile * 0.5; // Altura como 50% da largura (ajuste a proporção para texto e imagem)

  // Define a largura máxima para o grid na WEB
  const subMaxWebGridContainerWidth = 1200; // Exemplo: 700px para o grid de subcategorias na web
  const subContentWidthWeb = subMaxWebGridContainerWidth - (2 * SUB_ITEM_SPACING);
  const subItemWidthWeb = (subContentWidthWeb - (SUB_NUM_COLUMNS_WEB - 1) * SUB_ITEM_SPACING) / SUB_NUM_COLUMNS_WEB;
  const subItemHeightWeb = subItemWidthWeb * 0.6; // Mesma proporção para web

  // Determina o tamanho final do item com base na plataforma
  const finalSubItemWidth = Platform.OS === 'web' ? subItemWidthWeb : subItemWidthMobile;
  const finalSubItemHeight = Platform.OS === 'web' ? subItemHeightWeb : subItemHeightMobile;

  return (

    <ThemedView style={homeStyles.container}>

      <ThemedView style={[styles.customHeader]}>
        <TouchableOpacity onPress={() => router.replace('/')} style={styles.backButtonHeader}>
          <Ionicons name="chevron-back" size={24} color={useThemeColor({}, 'details')} />
        </TouchableOpacity>
        <ThemedText style={[styles.headerTitle]}>
          {category['categoria-long']}
        </ThemedText>
        {/* Espaço vazio para centralizar o título se houver botão na direita */}
        <View style={{ width: 24, marginLeft: 10 }} /> 
      </ThemedView>
      {/* FIM DO CABEÇALHO CUSTOMIZADO --- */}

      <ScrollView contentContainerStyle={homeStyles.scrollViewContent}>


        {/* Grid de Subcategorias (Serviços) */}
        <ThemedView style={[
          homeStyles.gridContainer, // Reutiliza estilos de gridContainer (flexWrap, flexDirection)
          styles.subCategoryGrid, // Estilos específicos para este grid (gap, marginTop)
          Platform.OS === 'web' && { maxWidth: subMaxWebGridContainerWidth, alignSelf: 'center' }
        ]}>
          {category.subcategorias.map((service, index) => {
            // Calcula a cor de fundo para o cartão
            const cardColor = COLOR_PALETTE[index % COLOR_PALETTE.length]; // Cicla pelas cores da paleta
            // Obtém a imagem do mapa, usando um ícone padrão se não encontrar
            const serviceImage = SUBCATEGORY_ICON_MAP[service.id] || SUBCATEGORY_ICON_MAP['default-subcategory'];

            return (
              <ThemedView
                key={service.id} // Usando service.id como key
                style={[
                  styles.subCategoryCardWrapper,
                  {
                    width: finalSubItemWidth,
                    height: finalSubItemHeight,
                  }
                ]}
              >
                <ServiceCategoryCard
                  name={service.nome}
                  backgroundColor={cardColor}
                  imageSource={serviceImage} // Passa a imagem do mapa
                  onPress={() => console.log('Serviço clicado:', service.nome, 'da categoria:', category.categoria)}
                  style={styles.serviceCategoryCard}
                />
              </ThemedView>
            );
          })}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 20, // Espaço do topo
  },
  subtitle: {
    fontSize: 16,
    color: '#666', // Cor fixa, considere usar useThemeColor para adaptação ao tema
    marginBottom: 20,
    textAlign: 'center',
  },
  subCategoryGrid: {
    marginTop: SUB_ITEM_SPACING, // Espaço entre o subtítulo e o grid
    gap: SUB_ITEM_SPACING, // Define o espaçamento IGUAL entre linhas e colunas para este grid
  },
  subCategoryCardWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  serviceCategoryCard: {
    flex: 1, // Faz o cartão preencher o wrapper
  },
  customHeader: { // <--- ESTILO PARA O CABEÇALHO CUSTOMIZADO
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'web' ? 15 : 50, // Ajuste para status bar
    paddingBottom: 10,
    width: '100%',
    // backgroundColor será aplicado dinamicamente
  },
  backButtonHeader: { // <--- ESTILO PARA O BOTÃO DE VOLTAR NO HEADER
    padding: 5, // Área de toque maior
    marginLeft: -5, // Ajuste para alinhar melhor o ícone
  },
  headerTitle: { // <--- ESTILO PARA O TÍTULO NO HEADER
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1, // Permite que o título ocupe o espaço central
    textAlign: 'center',
  },
});
