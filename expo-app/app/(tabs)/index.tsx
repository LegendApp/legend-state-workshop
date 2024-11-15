import { Todos } from '@/components/Todos';
import { generateId } from '@/core/generateId';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { getItem, setItem } = useAsyncStorage('my_id');
    const [id, setId] = useState<string | null>(null);

    // get id from async storage or create it
    useMemo(() => {
        getItem().then((id) => {
            if (id) {
                setId(id);
            } else {
                const newId = generateId();
                setItem(newId);
                setId(newId);
            }
        });
    }, []);

    console.log('6 - Home screen');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>{id && <Todos idUser={id} />}</ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        paddingHorizontal: 16,
    },
});
