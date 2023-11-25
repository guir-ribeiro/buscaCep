import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Modal,
} from 'react-native';
import api from './src/services/api';

export default function App() {
  const [cep, setCep] = useState('');
  const [cepUser, setCepUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const inputRef = useRef(null);

  function limpar() {
    setCep('');
    inputRef.current.focus();
    setCepUser(null);
  }

  async function buscar() {
    if (cep === ' ') {
      alert('Digite um cep válido');
      // alert(cep)
      return;
    }
    try {
      const response = await api.get(`/${cep}/json`);
      setCepUser(response.data);
      setModalVisible(true);
      Keyboard.dismiss();
      setCep('');
    } catch (error) {
      console.log('ERROR: ' + error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.title}>Digite o CEP desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 62725000"
          value={cep}
          onChangeText={texto => setCep(texto)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity
          style={[styles.botao, {backgroundColor: '#1d75cd'}]}
          onPress={buscar}>
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao, {backgroundColor: '#cd3e1d'}]}
          onPress={limpar}>
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser && (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalPosition}>
            <View style={styles.resultado}>
              <Text
                style={[
                  styles.itemText,
                  {
                    textAlign: 'center',
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginBottom: 20,
                  },
                ]}>
                Resultado
              </Text>
              <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
              <Text style={styles.itemText}>
                Localidade: {cepUser.localidade}
              </Text>
              <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
              <Text style={styles.itemText}>
                Logradouro: {cepUser.logradouro}
              </Text>
              <Text style={styles.itemText}>
                Complemento: {cepUser.complemento}
              </Text>
              <TouchableOpacity
                style={[
                  styles.botao,
                  {backgroundColor: '#cd3e1d', marginTop: 30},
                ]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.botaoText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 80,
    marginBottom: 40,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-around',
  },
  botao: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
  },
  botaoText: {
    fontSize: 20,
    color: '#fff',
  },
  modalPosition: {
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  resultado: {
    height: '50%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 22,
  },
});
