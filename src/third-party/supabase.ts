import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uhufrwpleysgmwqogsar.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVodWZyd3BsZXlzZ213cW9nc2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0MDUwNjcsImV4cCI6MjAzMjk4MTA2N30.Dks5s9wcOZqXrvZAu8iTfPB9Fv1mIJk_SiBzGv3EOuI";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
