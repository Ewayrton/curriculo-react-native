import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, Alert } from "react-native";
import { useColorScheme } from "nativewind";
import { RefreshScrollView } from "@/components/RefreshScrollView";

// Importa os novos componentes
import { AcademicCard, type AcademicItem } from "@/components/AcademicCard";
import { AcademicForm, type AcademicFormData } from "@/components/AcademicForm";

// Importa componentes da página
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { GraduationCap, Trash2, XCircle } from "lucide-react-native";

// --- Configuração da API ---
const BASE_URL = "https://curriculo-express-beige.vercel.app/educacao";
const PESSOA_ID = "22"; // ID fixo para criação do meu perfil de pessoa

// (Os tipos AcademicItem e AcademicFormData são importados dos componentes)

export default function AcademicScreen() {
  // Lógica de Tema
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#0F172A" : "#DFEFF4";
  const iconColor = isDark ? "#94a3b8" : "#475569";

  // --- Estados do CRUD ---
  const [academicData, setAcademicData] = useState<AcademicItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingItem, setEditingItem] = useState<AcademicItem | null>(null);

  // --- Lógica da API ---

  // GET (Listar)
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setAcademicData([]);
    try {
      const response = await fetch(`${BASE_URL}/pessoa/${PESSOA_ID}`); //
      if (!response.ok) {
        throw new Error("Falha ao buscar dados");
      }
      const data: AcademicItem[] = await response.json();
      setAcademicData(data);
    } catch (error) {
      // --- CORREÇÃO AQUI ---
      console.error(error);
      let errorMessage = "Não foi possível carregar os dados.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert("Erro ao carregar", errorMessage);
      // --- FIM DA CORREÇÃO (Linha ~89) ---
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // POST (Criar)
  const handleCreate = async (formData: AcademicFormData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const body = JSON.stringify({
        ...formData,
        dataFim: formData.dataFim || null,
        pessoaId: PESSOA_ID,
      });

      const response = await fetch(BASE_URL, { //
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
      Alert.alert("Sucesso!", "Nova formação adicionada.");
      loadData(); 
      return true; 
    } catch (error) {
      // --- CORREÇÃO AQUI ---
      console.error(error);
      let errorMessage = "Não foi possível salvar.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert("Erro", errorMessage);
      return false; // Falha
      // --- FIM DA CORREÇÃO (Linha ~122) ---
    } finally {
      setIsLoading(false);
    }
  };

  // PUT (Atualizar)
  const handleUpdate = async (formData: AcademicFormData): Promise<boolean> => {
    if (!editingItem) return false;
    setIsLoading(true);
    try {
      const body = JSON.stringify({
        ...formData,
        dataFim: formData.dataFim || null,
        pessoaId: PESSOA_ID,
      });

      const response = await fetch(`${BASE_URL}/${editingItem.id}`, { //
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
      Alert.alert("Sucesso!", "Formação atualizada.");
      setEditingItem(null); 
      loadData(); 
      return true; 
    } catch (error) {
      // --- CORREÇÃO AQUI ---
      console.error(error);
      let errorMessage = "Não foi possível atualizar.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert("Erro", errorMessage);
      return false; // Falha
      // --- FIM DA CORREÇÃO (Linha ~156, próxima da 144) ---
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE (Excluir)
  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { //
        method: "DELETE",
      });

      if (!response.ok) { // Espera 204 No Content
        throw new Error(await response.text());
      }
      Alert.alert("Sucesso!", "Formação excluída.");
      loadData(); 
    } catch (error) {
      // --- CORREÇÃO AQUI (Bônus, esta linha também daria erro) ---
      console.error(error);
      let errorMessage = "Não foi possível excluir.";
      if (error instanceof Error) {
        // Verifica se o erro é o HTML do Vercel
        if (error.message.includes("<!DOCTYPE html>")) {
           errorMessage = "O servidor retornou um erro 500 (Internal Server Error).";
        } else {
           errorMessage = error.message;
        }
      }
      Alert.alert("Erro", errorMessage);
      // --- FIM DA CORREÇÃO ---
    } finally {
      setIsLoading(false);
      setIsDeleting(false); 
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <RefreshScrollView
        onRefresh={loadData}
        scrollViewProps={{
          contentContainerStyle: { paddingBottom: 40 },
        }}
      >
        <Box className="px-5 py-5">
          
          {/* --- Renderização Condicional do Formulário --- */}
          {editingItem ? (
            // Modo de Edição
            <AcademicForm
              isLoading={isLoading}
              onSubmit={handleUpdate}
              initialData={editingItem}
              onCancel={() => setEditingItem(null)} // Botão de cancelar
            />
          ) : (
            // Modo de Criação
            <AcademicForm isLoading={isLoading} onSubmit={handleCreate} />
          )}
          
          <Divider className="my-4" />

          {/* --- Cabeçalho da Lista e Botão de Exclusão --- */}
          <HStack className="items-center mb-6 justify-between">
            <HStack className="items-center">
              <Icon as={GraduationCap} size="xl" color={iconColor} className="mr-2" />
              <Heading className="text-3xl font-bold text-black dark:text-white">
                Formações
              </Heading>
            </HStack>
            
            <Button
              size="sm"
              variant="link"
              action={isDeleting ? "primary" : "secondary"} // Muda a cor
              onPress={() => {
                setIsDeleting((prev) => !prev);
                setEditingItem(null); 
              }}
            >
              <Icon
                as={isDeleting ? XCircle : Trash2}
                color={isDeleting ? iconColor : (isDark ? "#f87171" : "#dc2626")}
                className="mr-1.5"
                size="sm"
              />
              <ButtonText>
                {isDeleting ? "Cancelar" : "Excluir"}
              </ButtonText>
            </Button>
          </HStack>

          {/* Indicador de Loading */}
          {isLoading && academicData.length === 0 && (
             <ButtonSpinner size="large" className="self-center mt-10" />
          )}

          {/* Mensagem de lista vazia */}
          {!isLoading && academicData.length === 0 && (
            <Text className="text-center text-slate-500 dark:text-slate-400">
              Nenhuma formação acadêmica encontrada.
            </Text>
          )}

          {/* --- Lista de Cards com Props de CRUD --- */}
          {academicData.map((item) => (
            <AcademicCard
              key={item.id}
              item={item}
              isDeleting={isDeleting} 
              onEdit={setEditingItem} 
              onDelete={handleDelete} 
            />
          ))}

        </Box>
      </RefreshScrollView>
    </SafeAreaView>
  );
}