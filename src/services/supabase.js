
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://zyzdyteuegrnfzlivyxm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5emR5dGV1ZWdybmZ6bGl2eXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODI3MjIsImV4cCI6MjAzODg1ODcyMn0.iC_LHHfK0HHMIID-qrQmkh9q2dCL_6sMKoG_3ZeFirg'
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase;