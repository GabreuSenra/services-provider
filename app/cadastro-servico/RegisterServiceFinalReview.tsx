import ProgressBar from '@/components/ProgressBar';
import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { globalStyles } from '@/constants/globalStyle';
import { auth, db } from '@/scripts/firebaseConfig';
import { router, useLocalSearchParams } from 'expo-router';
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet } from 'react-native';

export default function ServiceFinalReview() {
    const params = useLocalSearchParams();
    const {
        //estapa 1
        selectedCategory,
        selectedSubcategory,
        //etapa 2
        selectedTags,
        ServiceName,
        //etapa 3
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        cep,
        locationType,
        //etapa 4
        ownerFullName,
        ownerCpfNumber,
        ownerCnpjNumber,
        ownerBirthDate
    } = params;

    const [isLoading, setIsLoading] = useState(false);

    const handleConfirmAndSave = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            Alert.alert("Erro de Autenticação", "Você precisa estar logado para cadastrar um serviço.");
            return;
        }

        setIsLoading(true);

        const serviceData = {
            serviceName: ServiceName,
            category: selectedCategory,
            subcategory: selectedSubcategory,
            tags: Array.isArray(selectedTags) ? selectedTags : [selectedTags],
            
            location: {
                type: locationType,
                cep: cep,
                street: street,
                number: number,
                complement: complement,
                neighborhood: neighborhood,
                city: city,
                state: state,
            },

            owner: {
                fullName: ownerFullName,
                cpf: ownerCpfNumber, // CPF do responsável é sempre salvo
                cnpj: ownerCnpjNumber ? ownerCnpjNumber : null, // CNPJ é salvo condicionalmente
                birthDate: ownerBirthDate,
            },

            // Metadados importantes
            status: 'active',
            createdAt: new Date().toISOString(),
            userId: currentUser.uid, // ID do usuário que está cadastrando
        };

        try {
            
            const docRef = await addDoc(collection(db, "services"), serviceData);
            
            Alert.alert(
                "Cadastro Concluído!",
                "Seu serviço foi cadastrado com sucesso e já está visível para os clientes.",
                [{ text: "OK", onPress: () => router.replace('/(tabs)') }]
            );

        } catch (error) {
            console.error("Erro ao cadastrar serviço: ", error);
            Alert.alert("Erro", "Ocorreu um erro ao tentar cadastrar seu serviço. Por favor, tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const getServiceDataText = () => {
        let serviceData = (
            <>
                <ThemedText style={[globalStyles.boldText, {color: '#666'}]}>Serviço:</ThemedText> {ServiceName}
                {'\n'}
                <ThemedText style={[globalStyles.boldText, {color: '#666'}]}>Categoria:</ThemedText> {selectedCategory}
            </>
        );

        if (selectedSubcategory) {
            serviceData = (
                <>
                    {serviceData}
                    {'\n'}
                    <ThemedText style={[globalStyles.boldText, {color: '#666'}]}>Subcategoria:</ThemedText> {selectedSubcategory}
                </>
            );
        }

        if (Array.isArray(selectedTags) && selectedTags.length > 0) {
            serviceData = (
                <>
                    {serviceData}
                    {'\n'}
                    <ThemedText style={[globalStyles.boldText, {color: '#666'}]}>Tags:</ThemedText> {selectedTags.join(', ')}
                </>
            );
        } else if (typeof selectedTags === 'string' && selectedTags.trim()) {
            serviceData = (
                <>
                    {serviceData}
                    {'\n'}
                    <ThemedText style={[globalStyles.boldText, {color: '#666'}]}>Tags:</ThemedText> {selectedTags}
                </>
            );
        }

        // Dados do proprietário
        serviceData = (
            <>
                {serviceData}
                {'\n\n'}
                <ThemedText style={[globalStyles.boldText, {color: '#666'}]}>Proprietário:</ThemedText> {ownerFullName}
            </>
        );

        if (ownerCpfNumber) {
            serviceData = (
                <>
                    {serviceData}
                    {'\n'}
                    <ThemedText style={[globalStyles.boldText, {color: '#666'}]}>CPF:</ThemedText> {ownerCpfNumber}
                </>
            );
        }

        if (ownerCnpjNumber) {
            serviceData = (
                <>
                    {serviceData}
                    {'\n'}
                    <ThemedText style={[globalStyles.boldText, {color: '#666'}]}>CNPJ:</ThemedText> {ownerCnpjNumber}
                </>
            );
        }

        if (ownerBirthDate) {
            serviceData = (
                <>
                    {serviceData}
                    {'\n'}
                    <ThemedText style={[globalStyles.boldText, {color: '#666'}]}>Data de Nascimento:</ThemedText> {ownerBirthDate}
                </>
            );
        }

        return serviceData;
    };

    return (
        <ThemedView style={globalStyles.container}>
            <ProgressBar currentStep={1} totalSteps={4} />
            <ScrollView style={globalStyles.scrollViewContent}>
                <ThemedText style={globalStyles.title}>Revise seus dados!</ThemedText>
                <ThemedText style={globalStyles.subtitle}>Confirme se os dados abaixo estão corretos.</ThemedText>

                {/* Container principal para exibir os dados */}
                <ThemedView style={styles.addressContainer}>
                    <ThemedText style={styles.addressTitle}> Dados do Estabelecimento </ThemedText>
                    <ThemedText style={styles.addressText}>
                        {getServiceDataText()}
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.buttonContainer}>
                    <ThemedButton
                        title={isLoading ? "Salvando..." : "Confirmar e Cadastrar"}
                        onPress={handleConfirmAndSave}
                        disabled={isLoading}
                    />
                    <ThemedButton
                        title="Voltar e Corrigir"
                        onPress={() => router.back()}
                        disabled={isLoading}
                    />
                    {isLoading && <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 10 }} />}
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    addressContainer: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginVertical: 30, // Dá um bom espaçamento vertical
        borderWidth: 1,
        borderColor: '#eee',
    },
    addressTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    addressText: {
        fontSize: 16,
        lineHeight: 26, // Melhora a legibilidade
        color: '#555',
    },
    buttonContainer: {
        gap: 15, // Espaço entre os botões
    }
});
