import { StyleSheet } from 'react-native';

const ITEM_SPACING = 10;

export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'left',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  activityIndicator: {
    marginTop: 20,
  },
  secondaryButton: {
    backgroundColor: 'transparent', // Fundo transparente
    borderColor: '#CCC', // Borda cinza clara
    borderWidth: 1, // Largura da borda
  },
  secondaryButtonText: {
    color: '#666', // Cor do texto cinza
  },
});

export const perfilStyles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    backgroundColor: '#eee',
  },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  email: { fontSize: 16, color: '#666' },
  notLoggedInText: { // Novo estilo para o texto "Você não está conectado"
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  }
});

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: ITEM_SPACING, // <--- Agora usa ITEM_SPACING para o padding horizontal
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginTop: 10, // Removido, o marginTop do gridContainer já adiciona espaço
    marginBottom: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: -20
  },
  gridItemWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    // Margens aplicadas dinamicamente no componente para garantir espaçamento igual
  },
  gridButton: {
    flex: 1,
    paddingVertical: 0, // Ajuste o padding interno do botão para caber o texto/ícone
    paddingHorizontal: 0,
    borderRadius: 10,
  },
  gridButtonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  // Estilos originais do index.tsx (mantidos)
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

