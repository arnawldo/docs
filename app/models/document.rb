class Document < ApplicationRecord
  has_one_attached :doc
  belongs_to :user

  validates :title, presence: true
  validate :doc_should_be_attached

  def doc_should_be_attached
    errors.add(:doc, 'Needs a doc to be attached') unless doc.attached?
  end
end
