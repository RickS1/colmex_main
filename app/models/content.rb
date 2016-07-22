class Content < ActiveRecord::Base

    has_attached_file :icono, :styles => {},
                    :url => "/assets/contenidos/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/assets/contenidos/:id/:style/:basename.:extension"

  validates_presence_of :tipo

  validates_attachment_content_type :icono, :content_type => ['image/jpeg', 'image/png', 'image/jpg']
end
