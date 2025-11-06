// app/(main)/skills.tsx (Atualizado com formulário 'collapsible')

import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, Alert, Pressable } from "react-native"; // 1. Importa Pressable
import { useColorScheme } from "nativewind";
import { RefreshScrollView } from "@/components/RefreshScrollView";

// Importar os componentes
import { SkillCard, type SkillItem } from "@/components/SkillCard"; 
import { SkillForm, type SkillFormData } from "@/components/SkillForm"; 

// Importar componentes da página
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button"; 
import { Divider } from "@/components/ui/divider";

// 2. Importar os ícones de Mais e Menos
import { Award, Trash2, XCircle, PlusCircle, MinusCircle } from "lucide-react-native"; 

// --- Configuração da API ---
const BASE_URL = "https://curriculo-express-beige.vercel.app/habilidades";
const PESSOA_ID = "22"; 

export default function SkillsScreen() {
  // Lógica de Tema
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#0F172A" : "#DFEFF4";
  const iconColor = isDark ? "#94a3b8" : "#475569";

  // --- 3. Estados ---
  const [skillsData, setSkillsData] = useState<SkillItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 
  const [editingItem, setEditingItem] = useState<SkillItem | null>(null);

  // --- 4. NOVO ESTADO para controlar o formulário de "Adicionar" ---
  const [showAddForm, setShowAddForm] = useState(false);

  // --- 5. Lógica da API ---

  // GET (Listar)
  const loadData = useCallback(async () => {
    // ... (código do loadData, sem alteração)
    setIsLoading(true);
    setSkillsData([]);
    let responseBody = ""; 
    try {
      const response = await fetch(BASE_URL); 
      responseBody = await response.text(); 

      if (!response.ok) {
        throw new Error(responseBody);
      }
      const data: SkillItem[] = JSON.parse(responseBody);
      setSkillsData(data);
    } catch (error) {
      console.error(error); 
      let errorMessage = "Não foi possível carregar as habilidades.";
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
  const handleCreate = async (formData: SkillFormData): Promise<boolean> => {
    // ... (código do try/catch, sem alteração)
    setIsLoading(true);
    let responseBody = "";
    try {
      const body = JSON.stringify({
        nome: formData.nome,
        nivel: formData.nivel,
        pessoaId: PESSOA_ID,
      });

      const response = await fetch(BASE_URL, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      responseBody = await response.text();
      if (!response.ok) {
        throw new Error(responseBody);
      }

      Alert.alert("Sucesso!", "Nova habilidade adicionada.");
      loadData(); 
      setShowAddForm(false); // <-- 6. Fecha o formulário após o sucesso
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
  const handleUpdate = async (formData: SkillFormData): Promise<boolean> => {
    // ... (código do handleUpdate, sem alteração)
    if (!editingItem) return false;
    setIsLoading(true);
    let responseBody = "";
    try {
      const body = JSON.stringify({
        nome: formData.nome,
        nivel: formData.nivel,
        pessoaId: PESSOA_ID, 
      });

      const response = await fetch(`${BASE_URL}/${editingItem.id}`, { 
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      responseBody = await response.text(); 
      
      if (!response.ok) {
        throw new Error(responseBody);
      }

      Alert.alert("Sucesso!", "Habilidade atualizada.");
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
    // ... (código do handleDelete, sem alteração)
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

      Alert.alert("Sucesso!", "Habilidade excluída.");
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
          
          {/* --- 7. RENDERIZAÇÃO CONDICIONAL ATUALIZADA --- */}
          
          {/* Se estiver editando, mostra o formulário de EDIÇÃO */}
          {editingItem ? (
            <SkillForm
              isLoading={isLoading}
              onSubmit={handleUpdate}
              initialData={editingItem}
              onCancel={() => setEditingItem(null)} 
            />
          ) : (
            // Se NÃO estiver editando...
            <>
              {/* Mostra o GATILHO de "Adicionar Habilidade" */}
              <Pressable onPress={() => {
                  setShowAddForm((prev) => !prev); // Faz o TOOGLE (abre/fecha)
                  setIsDeleting(false); // Garante que sai do modo de exclusão
                }}>
                <HStack className="items-center mb-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 justify-between">
                  <Heading className="text-lg font-semibold text-black dark:text-white">
                    Adicionar Habilidade
                  </Heading>
                  {/* Ícone dinâmico: muda entre + e - */}
                  <Icon 
                    as={showAddForm ? MinusCircle : PlusCircle} 
                    size="md" 
                    color={iconColor} 
                  />
                </HStack>
              </Pressable>

              {/* E SE showAddForm for true, mostra o formulário de CRIAÇÃO */}
              {showAddForm && (
                <SkillForm 
                  isLoading={isLoading} 
                  onSubmit={handleCreate} 
                  onCancel={() => setShowAddForm(false)} // Passa o onCancel para fechar
                />
              )}
            </>
          )}
          {/* --- FIM DA ATUALIZAÇÃO --- */}

          
          <Divider className="my-4" />

          {/* --- 8. Cabeçalho da Lista e Botão de Exclusão --- */}
          <HStack className="items-center mb-6 justify-between">
            <HStack className="items-center">
              <Icon as={Award} size="xl" color={iconColor} className="mr-2" />
              <Heading className="text-3xl font-bold text-black dark:text-white">
                Habilidades
              </Heading>
            </HStack>
            
            <Button
              size="sm"
              variant="link"
              action={isDeleting ? "primary" : "secondary"} 
              onPress={() => {
                setIsDeleting((prev) => !prev);
                setEditingItem(null); // Garante que sai do modo de edição
                setShowAddForm(false); // 9. Esconde o form de adicionar
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
          {isLoading && skillsData.length === 0 && (
             <ButtonSpinner size="large" className="self-center mt-10" />
          )}

          {/* Mensagem de lista vazia */}
          {!isLoading && skillsData.length === 0 && (
            <Text className="text-center text-slate-500 dark:text-slate-400">
              Nenhuma habilidade encontrada.
            </Text>
          )}

          {/* --- 9. Lista de Cards com Props de CRUD --- */}
          {skillsData.map((item) => (
            <SkillCard
              key={item.id}
              item={item}
              isDeleting={isDeleting} 
              onEdit={(itemToEdit) => {
                setEditingItem(itemToEdit);
                setShowAddForm(false); // 10. Esconde o form de adicionar
                setIsDeleting(false); // Garante que sai do modo de exclusão
              }} 
              onDelete={handleDelete} 
            />
          ))}

        </Box>
      </RefreshScrollView>
    </SafeAreaView>
  );
}