-- RLS Policies for user_roles table
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for profiles table
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for patients table
CREATE POLICY "Patients can view own data"
  ON public.patients FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'doctor') OR public.has_role(auth.uid(), 'pharmacist') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Patients can update own data"
  ON public.patients FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Patients can insert own data"
  ON public.patients FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for doctors table
CREATE POLICY "Doctors can view own data"
  ON public.doctors FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Doctors can update own data"
  ON public.doctors FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Doctors can insert own data"
  ON public.doctors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage doctors"
  ON public.doctors FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for pharmacists table
CREATE POLICY "Pharmacists can view own data"
  ON public.pharmacists FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Pharmacists can update own data"
  ON public.pharmacists FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Pharmacists can insert own data"
  ON public.pharmacists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage pharmacists"
  ON public.pharmacists FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for addresses table
CREATE POLICY "Users can view own addresses"
  ON public.addresses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own addresses"
  ON public.addresses FOR ALL
  USING (auth.uid() = user_id);

-- RLS Policies for medicine_categories (public read, admin write)
CREATE POLICY "Anyone can view categories"
  ON public.medicine_categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.medicine_categories FOR ALL
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'pharmacist'));

-- RLS Policies for medicines (public read, admin/pharmacist write)
CREATE POLICY "Anyone can view active medicines"
  ON public.medicines FOR SELECT
  USING (is_active = true OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'pharmacist'));

CREATE POLICY "Admins and pharmacists can manage medicines"
  ON public.medicines FOR ALL
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'pharmacist'));

-- RLS Policies for suppliers
CREATE POLICY "Admins and pharmacists can view suppliers"
  ON public.suppliers FOR SELECT
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'pharmacist'));

CREATE POLICY "Admins can manage suppliers"
  ON public.suppliers FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for inventory_batches
CREATE POLICY "Admins and pharmacists can view batches"
  ON public.inventory_batches FOR SELECT
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'pharmacist'));

CREATE POLICY "Admins and pharmacists can manage batches"
  ON public.inventory_batches FOR ALL
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'pharmacist'));

-- RLS Policies for inventory
CREATE POLICY "Admins and pharmacists can view inventory"
  ON public.inventory FOR SELECT
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'pharmacist'));

CREATE POLICY "Admins and pharmacists can manage inventory"
  ON public.inventory FOR ALL
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'pharmacist'));

-- RLS Policies for prescriptions
CREATE POLICY "Patients can view own prescriptions"
  ON public.prescriptions FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.patients WHERE id = prescriptions.patient_id AND user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.doctors WHERE id = prescriptions.doctor_id AND user_id = auth.uid())
    OR public.has_role(auth.uid(), 'pharmacist')
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Doctors can create prescriptions"
  ON public.prescriptions FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.doctors WHERE id = prescriptions.doctor_id AND user_id = auth.uid()));

CREATE POLICY "Doctors can update own prescriptions"
  ON public.prescriptions FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.doctors WHERE id = prescriptions.doctor_id AND user_id = auth.uid()));

CREATE POLICY "Pharmacists can update prescription status"
  ON public.prescriptions FOR UPDATE
  USING (public.has_role(auth.uid(), 'pharmacist'));

-- RLS Policies for prescription_items
CREATE POLICY "View prescription items with prescription access"
  ON public.prescription_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.prescriptions p
      INNER JOIN public.patients pt ON p.patient_id = pt.id
      WHERE p.id = prescription_items.prescription_id AND pt.user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM public.prescriptions p
      INNER JOIN public.doctors d ON p.doctor_id = d.id
      WHERE p.id = prescription_items.prescription_id AND d.user_id = auth.uid()
    )
    OR public.has_role(auth.uid(), 'pharmacist')
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Doctors can manage prescription items"
  ON public.prescription_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.prescriptions p
      INNER JOIN public.doctors d ON p.doctor_id = d.id
      WHERE p.id = prescription_items.prescription_id AND d.user_id = auth.uid()
    )
  );

-- RLS Policies for orders
CREATE POLICY "Patients can view own orders"
  ON public.orders FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.patients WHERE id = orders.patient_id AND user_id = auth.uid())
    OR public.has_role(auth.uid(), 'pharmacist')
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Patients can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.patients WHERE id = orders.patient_id AND user_id = auth.uid()));

CREATE POLICY "Pharmacists and admins can update orders"
  ON public.orders FOR UPDATE
  USING (public.has_role(auth.uid(), 'pharmacist') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for order_items
CREATE POLICY "View order items with order access"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders o
      INNER JOIN public.patients p ON o.patient_id = p.id
      WHERE o.id = order_items.order_id AND p.user_id = auth.uid()
    )
    OR public.has_role(auth.uid(), 'pharmacist')
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Patients can insert order items for own orders"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders o
      INNER JOIN public.patients p ON o.patient_id = p.id
      WHERE o.id = order_items.order_id AND p.user_id = auth.uid()
    )
  );

-- RLS Policies for delivery_partners
CREATE POLICY "Staff can view delivery partners"
  ON public.delivery_partners FOR SELECT
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'pharmacist'));

CREATE POLICY "Admins can manage delivery partners"
  ON public.delivery_partners FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for shipments
CREATE POLICY "View shipments with order access"
  ON public.shipments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders o
      INNER JOIN public.patients p ON o.patient_id = p.id
      WHERE o.id = shipments.order_id AND p.user_id = auth.uid()
    )
    OR public.has_role(auth.uid(), 'pharmacist')
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Staff can manage shipments"
  ON public.shipments FOR ALL
  USING (public.has_role(auth.uid(), 'pharmacist') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for payments
CREATE POLICY "View payments with order access"
  ON public.payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders o
      INNER JOIN public.patients p ON o.patient_id = p.id
      WHERE o.id = payments.order_id AND p.user_id = auth.uid()
    )
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "System can insert payments"
  ON public.payments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update payments"
  ON public.payments FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for invoices
CREATE POLICY "View invoices with order access"
  ON public.invoices FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.patients WHERE id = invoices.patient_id AND user_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
    OR public.has_role(auth.uid(), 'pharmacist')
  );

CREATE POLICY "System can create invoices"
  ON public.invoices FOR INSERT
  WITH CHECK (true);

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for audit_logs
CREATE POLICY "Admins and auditors can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'auditor') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "System can insert audit logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (true);

-- RLS Policies for access_logs
CREATE POLICY "Admins and auditors can view access logs"
  ON public.access_logs FOR SELECT
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'auditor') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "System can insert access logs"
  ON public.access_logs FOR INSERT
  WITH CHECK (true);

-- RLS Policies for attachments
CREATE POLICY "Users can view own attachments"
  ON public.attachments FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can upload attachments"
  ON public.attachments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own attachments"
  ON public.attachments FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for blog_categories (public read, admin write)
CREATE POLICY "Anyone can view blog categories"
  ON public.blog_categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage blog categories"
  ON public.blog_categories FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for blog_posts (public read published, admin write)
CREATE POLICY "Anyone can view published blogs"
  ON public.blog_posts FOR SELECT
  USING (is_published = true OR public.has_role(auth.uid(), 'admin') OR auth.uid() = author_id);

CREATE POLICY "Admins and authors can create blogs"
  ON public.blog_posts FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'doctor'));

CREATE POLICY "Authors and admins can update blogs"
  ON public.blog_posts FOR UPDATE
  USING (auth.uid() = author_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blogs"
  ON public.blog_posts FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for FAQs (public read, admin write)
CREATE POLICY "Anyone can view active FAQs"
  ON public.faqs FOR SELECT
  USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage FAQs"
  ON public.faqs FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for support_tickets
CREATE POLICY "Users can view own tickets"
  ON public.support_tickets FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = assigned_to OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create tickets"
  ON public.support_tickets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Staff can update tickets"
  ON public.support_tickets FOR UPDATE
  USING (auth.uid() = assigned_to OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for ticket_messages
CREATE POLICY "View messages with ticket access"
  ON public.ticket_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.support_tickets
      WHERE id = ticket_messages.ticket_id
      AND (user_id = auth.uid() OR assigned_to = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

CREATE POLICY "Users can add messages to own tickets"
  ON public.ticket_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.support_tickets
      WHERE id = ticket_messages.ticket_id
      AND (user_id = auth.uid() OR assigned_to = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

-- RLS Policies for job_postings (public read, admin write)
CREATE POLICY "Anyone can view active jobs"
  ON public.job_postings FOR SELECT
  USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage jobs"
  ON public.job_postings FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for job_applications
CREATE POLICY "Admins can view all applications"
  ON public.job_applications FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can submit applications"
  ON public.job_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update applications"
  ON public.job_applications FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for newsletter_subscriptions
CREATE POLICY "Users can view own subscription"
  ON public.newsletter_subscriptions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can subscribe"
  ON public.newsletter_subscriptions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own subscription"
  ON public.newsletter_subscriptions FOR UPDATE
  USING (true);

-- RLS Policies for certifications (admin only)
CREATE POLICY "Anyone can view certifications"
  ON public.certifications FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage certifications"
  ON public.certifications FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for compliance_documents (admin only)
CREATE POLICY "Anyone can view active compliance docs"
  ON public.compliance_documents FOR SELECT
  USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage compliance docs"
  ON public.compliance_documents FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));