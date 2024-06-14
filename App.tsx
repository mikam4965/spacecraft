import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NetworkProvider } from './src/components/Network';
import { useStarships } from './src/hooks/useStarships';
import { PaperProvider } from 'react-native-paper';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <PaperProvider>
                <NetworkProvider>
                    <View style={styles.container}> 
                        <Text style={styles.title}>Starships</Text>
                    <StarshipsList />
                    </View>
                </NetworkProvider>
            </PaperProvider>
        </QueryClientProvider>
    );
};

const StarshipsList = () => {
    const { data, error, isLoading, refetch } = useStarships();

    if (isLoading) {
        return (
            <Text>Loading...</Text>
        );
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <FlatList
            data={data.results}
            keyExtractor={item => item.name}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.model}>{item.model}</Text>
                    <Text style={styles.manufacturer}>{item.manufacturer}</Text>
                    <Text style={styles.cost}>{item.cost_in_credits} credits</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>BUY THIS SPACESHIP</Text>
                    </TouchableOpacity>
                </View>
            )}
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
        />
    );
};

const styles = StyleSheet.create({
    title:{
        fontSize:20,
        marginVertical:10
    },
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        padding: 25,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 16,
        marginVertical: 18,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 1,
        color: '#363333',
    },
    model: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
    manufacturer: {
        fontSize: 14,
        marginBottom: 4,
    },
    cost: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 18,
        color:'#363333',
    },
    button: {
        borderRadius: 4,
       // paddingVertical: 10,
        alignItems: 'flex-start',
    },
    buttonText: {
        color: '#7868E6',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
export default App;
