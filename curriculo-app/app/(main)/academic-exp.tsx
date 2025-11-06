import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, Alert } from "react-native";
import { useColorScheme } from "nativewind";
import { RefreshScrollView } from "@/components/RefreshScrollView";

// Importa os componentes
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
const PESSOA_ID = "22"; 
// --- Fim da Configuração ---

export default function AcademicScreen() {
  // Lógica de Tema
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#0F172A" : "#DFEFF4";
  const iconColor = isDark ? "#94a3b8" : "#475569";

  // --- Estados (showAddForm foi removido) ---
  const [academicData, setAcademicData] = useState<AcademicItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 
  const [editingItem, setEditingItem] = useState<AcademicItem | null>(null);

  // --- Lógica da API (sem alterações) ---
  // GET (Listar)
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setAcademicData([]);
    let responseBody = ""; 
    try {
      const response = await fetch(`${BASE_URL}/pessoa/${PESSOA_ID}`); 
      responseBody = await response.text(); 
      if (!response.ok) throw new Error(responseBody);
      const data: AcademicItem[] = JSON.parse(responseBody);
      setAcademicData(data);
    } catch (error) {
      console.error(error); 
      let errorMessage = "Não foi possível carregar os dados.";
      try {
        const errorJson = JSON.parse(responseBody);
        errorMessage = errorJson.message || "Erro do backend";
      } catch (e) {
        if (responseBody.includes("<!DOCTYPE html>")) {
          errorMessage = "Erro 500: O servidor quebrou.";
        } else if (responseBody) {
          errorMessage = responseBody;
        }
      }
      Alert.alert("Erro ao carregar", errorMessage); 
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
    let responseBody = "";
    try {
      const body = JSON.stringify({
        ...formData,
        dataFim: formData.dataFim || null,
        pessoaId: PESSOA_ID,
      });
      const response = await fetch(BASE_URL, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });
      responseBody = await response.text();
      if (!response.ok) throw new Error(responseBody);
      Alert.alert("Sucesso!", "Nova formação adicionada.");
      loadData(); 
      return true; 
    } catch (error) {
      console.error(error);
      let errorMessage = "Não foi possível salvar.";
      try {
        const errorJson = JSON.parse(responseBody);
        errorMessage = errorJson.message || "Erro ao salvar";
      } catch (e) {
        errorMessage = responseBody || "Erro desconhecido";
      }
      Alert.alert("Erro", errorMessage);
      return false; 
    } finally {
      setIsLoading(false);
    }
  };

  // PUT (Atualizar)
  const handleUpdate = async (formData: AcademicFormData): Promise<boolean> => {
    if (!editingItem) return false;
    setIsLoading(true);
    let responseBody = "";
    try {
      const body = JSON.stringify({
        ...formData,
        dataFim: formData.dataFim || null,
        pessoaId: PESSOA_ID, 
      });
      const response = await fetch(`${BASE_URL}/${editingItem.id}`, { 
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: body,
      });
      responseBody = await response.text(); 
      if (!response.ok) throw new Error(responseBody);
      Alert.alert("Sucesso!", "Formação atualizada.");
      setEditingItem(null); 
      loadData(); 
      return true; 
    } catch (error) {
      console.error(error);
      let errorMessage = "Não foi possível atualizar.";
      try {
        const errorJson = JSON.parse(responseBody);
        errorMessage = errorJson.message || "Erro ao atualizar";
      } catch (e) {
         errorMessage = responseBody || "Erro desconhecido";
      }
      Alert.alert("Erro", errorMessage);
      return false; 
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE (Excluir)
  const handleDelete = async (id: string) => {
    setIsLoading(true);
    let responseBody = "";
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { 
        method: "DELETE",
      });
      responseBody = await response.text(); 
      if (!response.ok && response.status !== 204) { 
        throw new Error(responseBody);
      }
      Alert.alert("Sucesso!", "Formação excluída.");
      loadData(); 
    } catch (error) {
      console.error(error);
      let errorMessage = "Não foi possível excluir.";
      try {
        const errorJson = JSON.parse(responseBody);
        errorMessage = errorJson.message || "Erro ao excluir";
      } catch (e) {
        if (responseBody.includes("<!DOCTYPE html>")) {
          errorMessage = "Erro 500: O servidor quebrou.";
        } else if (responseBody && responseBody.length > 0) {
          errorMessage = responseBody;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
      }
      Alert.alert("Erro", errorMessage);
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
          
          {/* --- Renderização Condicional ATUALIZADA --- */}
          {editingItem ? (
            <AcademicForm
              isLoading={isLoading}
              onSubmit={handleUpdate}
              initialData={editingItem}
              onCancel={() => setEditingItem(null)} 
            />
          ) : (
            <AcademicForm 
              isLoading={isLoading} 
              onSubmit={handleCreate} 
            />
          )}
          
          <Divider className="my-4" />

          {/* --- Cabeçalho da Lista e Botão de Exclusão (TÍTULO ATUALIZADO) --- */}
          <HStack className="items-center mb-6 justify-between">
            <HStack className="items-center">
              <Icon as={GraduationCap} size="xl" color={iconColor} className="mr-2" />
              <Heading className="text-3xl font-bold text-black dark:text-white">
                Formação {/* <-- TÍTULO MUDADO */}
              </Heading>
            </HStack>
            
            <Button
              size="sm"
              variant="link"
              action={isDeleting ? "primary" : "secondary"} 
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
              Nenhuma formação encontrada.
            </Text>
          )}

          {/* --- Lista de Cards --- */}
          {academicData.map((item) => (
            <AcademicCard
              key={item.id}
              item={item}
              isDeleting={isDeleting} 
              onEdit={(itemToEdit) => {
                setEditingItem(itemToEdit);
                setIsDeleting(false); 
              }} 
              onDelete={handleDelete} 
            />
          ))}

        </Box>
      </RefreshScrollView>
    </SafeAreaView>
  );
}