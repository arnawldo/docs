class DocumentsController < ApplicationController
  def index
    @documents = current_user.documents
  end

  def create
    @document = current_user.documents.create(document_params)

    if @document.save
      redirect_to user_documents_path(current_user)
    else
      render 'new'
    end
  end

  def new
    @document = current_user.documents.build
  end

  def destroy
    @document = current_user.documents.find(params[:id])
    @document.destroy
    redirect_to user_documents_path(current_user)
  end

  private

  def document_params
    params.require(:document).permit(:title, :doc)
  end
end