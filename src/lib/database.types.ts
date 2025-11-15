export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      vehicles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          nome: string
          email: string
          whatsapp: string | null
          genero: string | null
          tipo_veiculo: string | null
          marca: string | null
          modelo: string | null
          ano: string | null
          quilometragem: string | null
          combustivel: string | null
          tipo_oleo: string | null
          frequencia_uso: string | null
          principal_uso: string[] | null
          manutencoes_realizadas: string[] | null
          frequencia_lembrete: string | null
          servicos_importantes: string[] | null
          km_troca_oleo: string | null
          passou_km_ideal: string | null
          frequencia_atraso: string | null
          tem_historico: string | null
          ultima_manutencao: string | null
          preferencia_oficina: string | null
          preocupacoes: string[] | null
          estado_geral: string | null
          tem_problema: string | null
          descricao_problema: string | null
          sistema_monitoramento: string | null
          quer_dicas_personalizadas: string | null
          pais: string | null
          estado: string | null
          bairro: string | null
          feedback_adicional: string | null
          health_score: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          nome: string
          email: string
          whatsapp?: string | null
          genero?: string | null
          tipo_veiculo?: string | null
          marca?: string | null
          modelo?: string | null
          ano?: string | null
          quilometragem?: string | null
          combustivel?: string | null
          tipo_oleo?: string | null
          frequencia_uso?: string | null
          principal_uso?: string[] | null
          manutencoes_realizadas?: string[] | null
          frequencia_lembrete?: string | null
          servicos_importantes?: string[] | null
          km_troca_oleo?: string | null
          passou_km_ideal?: string | null
          frequencia_atraso?: string | null
          tem_historico?: string | null
          ultima_manutencao?: string | null
          preferencia_oficina?: string | null
          preocupacoes?: string[] | null
          estado_geral?: string | null
          tem_problema?: string | null
          descricao_problema?: string | null
          sistema_monitoramento?: string | null
          quer_dicas_personalizadas?: string | null
          pais?: string | null
          estado?: string | null
          bairro?: string | null
          feedback_adicional?: string | null
          health_score?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          nome?: string
          email?: string
          whatsapp?: string | null
          genero?: string | null
          tipo_veiculo?: string | null
          marca?: string | null
          modelo?: string | null
          ano?: string | null
          quilometragem?: string | null
          combustivel?: string | null
          tipo_oleo?: string | null
          frequencia_uso?: string | null
          principal_uso?: string[] | null
          manutencoes_realizadas?: string[] | null
          frequencia_lembrete?: string | null
          servicos_importantes?: string[] | null
          km_troca_oleo?: string | null
          passou_km_ideal?: string | null
          frequencia_atraso?: string | null
          tem_historico?: string | null
          ultima_manutencao?: string | null
          preferencia_oficina?: string | null
          preocupacoes?: string[] | null
          estado_geral?: string | null
          tem_problema?: string | null
          descricao_problema?: string | null
          sistema_monitoramento?: string | null
          quer_dicas_personalizadas?: string | null
          pais?: string | null
          estado?: string | null
          bairro?: string | null
          feedback_adicional?: string | null
          health_score?: number | null
        }
      }
      maintenance_records: {
        Row: {
          id: string
          created_at: string
          vehicle_id: string
          tipo_manutencao: string
          descricao: string
          quilometragem: string
          custo: number | null
          oficina: string | null
          data_manutencao: string
        }
        Insert: {
          id?: string
          created_at?: string
          vehicle_id: string
          tipo_manutencao: string
          descricao: string
          quilometragem: string
          custo?: number | null
          oficina?: string | null
          data_manutencao: string
        }
        Update: {
          id?: string
          created_at?: string
          vehicle_id?: string
          tipo_manutencao?: string
          descricao?: string
          quilometragem?: string
          custo?: number | null
          oficina?: string | null
          data_manutencao?: string
        }
      }
    }
  }
}
