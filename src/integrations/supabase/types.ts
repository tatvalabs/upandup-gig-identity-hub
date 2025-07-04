export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      employer_certifications: {
        Row: {
          certificate_type: string
          description: string | null
          expires_at: string | null
          id: string
          issued_at: string | null
          metadata: Json | null
          partner_id: string | null
          title: string
          vc_url: string | null
          worker_id: string | null
        }
        Insert: {
          certificate_type: string
          description?: string | null
          expires_at?: string | null
          id?: string
          issued_at?: string | null
          metadata?: Json | null
          partner_id?: string | null
          title: string
          vc_url?: string | null
          worker_id?: string | null
        }
        Update: {
          certificate_type?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          issued_at?: string | null
          metadata?: Json | null
          partner_id?: string | null
          title?: string
          vc_url?: string | null
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_certifications_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_certifications_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_users: {
        Row: {
          created_at: string | null
          id: string
          partner_id: string | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          partner_id?: string | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          partner_id?: string | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_users_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          address: string | null
          cord_node_id: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          onboarding_completed: boolean | null
          partnership_status: string | null
          phone: string | null
          registration_number: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          cord_node_id?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          onboarding_completed?: boolean | null
          partnership_status?: string | null
          phone?: string | null
          registration_number?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          cord_node_id?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          onboarding_completed?: boolean | null
          partnership_status?: string | null
          phone?: string | null
          registration_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      partnership_agreements: {
        Row: {
          agreement_type: string
          created_at: string | null
          expires_at: string | null
          id: string
          partner_id: string | null
          signed_at: string | null
          status: string | null
          terms: Json | null
        }
        Insert: {
          agreement_type: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          partner_id?: string | null
          signed_at?: string | null
          status?: string | null
          terms?: Json | null
        }
        Update: {
          agreement_type?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          partner_id?: string | null
          signed_at?: string | null
          status?: string | null
          terms?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "partnership_agreements_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      trust_scores: {
        Row: {
          employer_verified: boolean | null
          factors: Json
          government_verified: boolean | null
          id: string
          last_calculated: string | null
          score: number
          total_credentials: number | null
          verified_credentials: number | null
          version: number | null
          worker_id: string | null
        }
        Insert: {
          employer_verified?: boolean | null
          factors: Json
          government_verified?: boolean | null
          id?: string
          last_calculated?: string | null
          score?: number
          total_credentials?: number | null
          verified_credentials?: number | null
          version?: number | null
          worker_id?: string | null
        }
        Update: {
          employer_verified?: boolean | null
          factors?: Json
          government_verified?: boolean | null
          id?: string
          last_calculated?: string | null
          score?: number
          total_credentials?: number | null
          verified_credentials?: number | null
          version?: number | null
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trust_scores_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_requests: {
        Row: {
          completed_at: string | null
          created_at: string | null
          digilocker_request_id: string | null
          document_type: string
          error_message: string | null
          id: string
          status: string | null
          verification_data: Json | null
          worker_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          digilocker_request_id?: string | null
          document_type: string
          error_message?: string | null
          id?: string
          status?: string | null
          verification_data?: Json | null
          worker_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          digilocker_request_id?: string | null
          document_type?: string
          error_message?: string | null
          id?: string
          status?: string | null
          verification_data?: Json | null
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_requests_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_credentials: {
        Row: {
          credential_type: string
          document_hash: string | null
          document_type: string
          document_url: string | null
          expires_at: string | null
          id: string
          issued_at: string | null
          issuer_id: string | null
          issuer_type: string
          metadata: Json | null
          vc_url: string | null
          verification_status: string | null
          worker_id: string | null
        }
        Insert: {
          credential_type: string
          document_hash?: string | null
          document_type: string
          document_url?: string | null
          expires_at?: string | null
          id?: string
          issued_at?: string | null
          issuer_id?: string | null
          issuer_type: string
          metadata?: Json | null
          vc_url?: string | null
          verification_status?: string | null
          worker_id?: string | null
        }
        Update: {
          credential_type?: string
          document_hash?: string | null
          document_type?: string
          document_url?: string | null
          expires_at?: string | null
          id?: string
          issued_at?: string | null
          issuer_id?: string | null
          issuer_type?: string
          metadata?: Json | null
          vc_url?: string | null
          verification_status?: string | null
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "worker_credentials_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      workers: {
        Row: {
          aadhar_hash: string | null
          address: string | null
          created_at: string | null
          did: string | null
          email: string | null
          id: string
          mobile_app_registered: boolean | null
          name: string
          onboarding_status: string | null
          partner_id: string | null
          phone: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          aadhar_hash?: string | null
          address?: string | null
          created_at?: string | null
          did?: string | null
          email?: string | null
          id?: string
          mobile_app_registered?: boolean | null
          name: string
          onboarding_status?: string | null
          partner_id?: string | null
          phone: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          aadhar_hash?: string | null
          address?: string | null
          created_at?: string | null
          did?: string | null
          email?: string | null
          id?: string
          mobile_app_registered?: boolean | null
          name?: string
          onboarding_status?: string | null
          partner_id?: string | null
          phone?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workers_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
