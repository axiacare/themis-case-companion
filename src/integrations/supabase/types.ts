export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_sessions: {
        Row: {
          admin_user_id: string
          created_at: string
          expires_at: string
          id: string
          ip_address: string | null
          is_active: boolean | null
          session_token: string
          user_agent: string | null
        }
        Insert: {
          admin_user_id: string
          created_at?: string
          expires_at: string
          id?: string
          ip_address?: string | null
          is_active?: boolean | null
          session_token: string
          user_agent?: string | null
        }
        Update: {
          admin_user_id?: string
          created_at?: string
          expires_at?: string
          id?: string
          ip_address?: string | null
          is_active?: boolean | null
          session_token?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_sessions_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string
          email: string | null
          failed_login_attempts: number | null
          id: string
          is_active: boolean | null
          last_login_at: string | null
          locked_until: string | null
          password_hash: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          failed_login_attempts?: number | null
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          locked_until?: string | null
          password_hash: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          email?: string | null
          failed_login_attempts?: number | null
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          locked_until?: string | null
          password_hash?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          accessed_fields: string[] | null
          action: string
          id: string
          ip_address: string | null
          target_table: string | null
          target_team_id: string | null
          team_id: string
          timestamp: string | null
          user_agent: string | null
        }
        Insert: {
          accessed_fields?: string[] | null
          action: string
          id?: string
          ip_address?: string | null
          target_table?: string | null
          target_team_id?: string | null
          team_id: string
          timestamp?: string | null
          user_agent?: string | null
        }
        Update: {
          accessed_fields?: string[] | null
          action?: string
          id?: string
          ip_address?: string | null
          target_table?: string | null
          target_team_id?: string | null
          team_id?: string
          timestamp?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      cases: {
        Row: {
          case_data: Json
          created_at: string
          id: string
          team_id: string
          updated_at: string
        }
        Insert: {
          case_data: Json
          created_at?: string
          id?: string
          team_id: string
          updated_at?: string
        }
        Update: {
          case_data?: Json
          created_at?: string
          id?: string
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cases_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["team_id"]
          },
        ]
      }
      team_auth: {
        Row: {
          created_at: string
          failed_login_attempts: number | null
          id: string
          last_login_at: string | null
          locked_until: string | null
          password_hash: string
          team_id: string
          updated_at: string
          webhook_url: string | null
        }
        Insert: {
          created_at?: string
          failed_login_attempts?: number | null
          id?: string
          last_login_at?: string | null
          locked_until?: string | null
          password_hash: string
          team_id: string
          updated_at?: string
          webhook_url?: string | null
        }
        Update: {
          created_at?: string
          failed_login_attempts?: number | null
          id?: string
          last_login_at?: string | null
          locked_until?: string | null
          password_hash?: string
          team_id?: string
          updated_at?: string
          webhook_url?: string | null
        }
        Relationships: []
      }
      team_settings: {
        Row: {
          created_at: string
          id: string
          settings: Json
          team_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          settings?: Json
          team_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          settings?: Json
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_settings_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["team_id"]
          },
        ]
      }
      teams: {
        Row: {
          cnpj: string | null
          created_at: string
          email: string | null
          id: string
          phone: string | null
          responsible_name: string | null
          team_id: string
          team_name: string
          terms_document_url: string | null
          updated_at: string
        }
        Insert: {
          cnpj?: string | null
          created_at?: string
          email?: string | null
          id?: string
          phone?: string | null
          responsible_name?: string | null
          team_id: string
          team_name: string
          terms_document_url?: string | null
          updated_at?: string
        }
        Update: {
          cnpj?: string | null
          created_at?: string
          email?: string | null
          id?: string
          phone?: string | null
          responsible_name?: string | null
          team_id?: string
          team_name?: string
          terms_document_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      teams_safe: {
        Row: {
          created_at: string
          team_id: string
          team_name: string
        }
        Insert: {
          created_at?: string
          team_id: string
          team_name: string
        }
        Update: {
          created_at?: string
          team_id?: string
          team_name?: string
        }
        Relationships: []
      }
      webhook_settings: {
        Row: {
          auth_webhook_url: string | null
          case_webhook_url: string | null
          created_at: string
          id: string
          team_id: string
          team_webhook_url: string | null
          updated_at: string
          webhook_secret: string | null
        }
        Insert: {
          auth_webhook_url?: string | null
          case_webhook_url?: string | null
          created_at?: string
          id?: string
          team_id: string
          team_webhook_url?: string | null
          updated_at?: string
          webhook_secret?: string | null
        }
        Update: {
          auth_webhook_url?: string | null
          case_webhook_url?: string | null
          created_at?: string
          id?: string
          team_id?: string
          team_webhook_url?: string | null
          updated_at?: string
          webhook_secret?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_authenticate: {
        Args: {
          p_ip_address?: string
          p_password: string
          p_user_agent?: string
          p_username: string
        }
        Returns: {
          admin_data: Json
          error_message: string
          session_token: string
          success: boolean
        }[]
      }
      admin_create_team: {
        Args: {
          p_cnpj?: string
          p_email?: string
          p_password: string
          p_phone?: string
          p_responsible_name?: string
          p_team_id: string
          p_team_name: string
          p_terms_document_url?: string
        }
        Returns: string
      }
      admin_create_user: {
        Args: { p_email?: string; p_password: string; p_username: string }
        Returns: string
      }
      admin_delete_team: {
        Args: { p_team_uuid: string }
        Returns: boolean
      }
      admin_list_teams: {
        Args: Record<PropertyKey, never>
        Returns: {
          cnpj: string
          created_at: string
          email: string
          id: string
          phone: string
          responsible_name: string
          team_id: string
          team_name: string
          terms_document_url: string
          updated_at: string
        }[]
      }
      admin_logout: {
        Args: { p_session_token: string }
        Returns: boolean
      }
      admin_update_team: {
        Args: {
          p_cnpj?: string
          p_email?: string
          p_password?: string
          p_phone?: string
          p_responsible_name?: string
          p_team_name: string
          p_team_uuid: string
          p_terms_document_url?: string
        }
        Returns: boolean
      }
      admin_validate_session: {
        Args: { p_session_token: string }
        Returns: {
          admin_data: Json
          valid: boolean
        }[]
      }
      get_current_team_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_teams_safe: {
        Args: Record<PropertyKey, never>
        Returns: {
          cnpj: string
          created_at: string
          email: string
          phone: string
          responsible_name: string
          team_id: string
          team_name: string
        }[]
      }
      get_teams_safe_secure: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          team_id: string
          team_name: string
        }[]
      }
      is_system_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_sensitive_access: {
        Args: {
          p_accessed_fields: string[]
          p_action: string
          p_target_table: string
          p_target_team_id: string
        }
        Returns: undefined
      }
      mask_cnpj: {
        Args: {
          cnpj_value: string
          owner_team_id: string
          viewer_team_id: string
        }
        Returns: string
      }
      mask_email: {
        Args: {
          email_value: string
          owner_team_id: string
          viewer_team_id: string
        }
        Returns: string
      }
      mask_phone: {
        Args: {
          owner_team_id: string
          phone_value: string
          viewer_team_id: string
        }
        Returns: string
      }
      mask_responsible_name: {
        Args: {
          name_value: string
          owner_team_id: string
          viewer_team_id: string
        }
        Returns: string
      }
      mask_sensitive_data: {
        Args: {
          data_type: string
          data_value: string
          owner_team_id: string
          viewer_team_id: string
        }
        Returns: string
      }
      set_team_context: {
        Args: { p_team_id: string }
        Returns: undefined
      }
      update_webhook_settings: {
        Args: {
          p_auth_webhook_url?: string
          p_case_webhook_url?: string
          p_team_id: string
          p_team_webhook_url?: string
          p_webhook_secret?: string
        }
        Returns: boolean
      }
      validate_webhook_url: {
        Args: { p_url: string }
        Returns: boolean
      }
      verify_team_login: {
        Args: { p_password: string; p_team_id: string }
        Returns: {
          success: boolean
          team_data: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
