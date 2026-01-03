export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      notes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          color: string;
          created_at: string;
          updated_at: string;
          is_archived: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content: string;
          color?: string;
          created_at?: string;
          updated_at?: string;
          is_archived?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          content?: string;
          color?: string;
          created_at?: string;
          updated_at?: string;
          is_archived?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "notes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
