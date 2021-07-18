import {
  BaseMixin,
  ListMixin,
  CreateMixin,
  RetrieveMixin,
  UpdateMixin,
  DestroyMixin,
} from "./mixins";
import { applyMixins } from "../../utils";

export class GenericAction extends BaseMixin {}
export class ListAction extends ListMixin {}
export class CreateAction extends CreateMixin {}
export class RetrieveAction extends RetrieveMixin {}
export class UpdateAction extends UpdateMixin {}
export class DestroyAction extends DestroyMixin {}

export interface ListCreateAction extends ListMixin, CreateMixin {}
export class ListCreateAction extends BaseMixin {}
applyMixins(ListCreateAction, [ListMixin, CreateMixin]);

export interface ReadOnlyAction extends ListMixin, RetrieveMixin {}
export class ReadOnlyAction extends BaseMixin {}
applyMixins(ReadOnlyAction, [ListMixin, RetrieveMixin]);

export interface RetrieveUpdateAction extends RetrieveMixin, UpdateMixin {}
export class RetrieveUpdateAction extends BaseMixin {}
applyMixins(RetrieveUpdateAction, [RetrieveMixin, UpdateMixin]);

export interface RetrieveDestroyAction extends RetrieveMixin, DestroyMixin {}
export class RetrieveDestroyAction extends BaseMixin {}
applyMixins(RetrieveDestroyAction, [RetrieveMixin, DestroyMixin]);

export interface RetrieveUpdateDestroyAction
  extends RetrieveMixin,
    UpdateMixin,
    DestroyMixin {}
export class RetrieveUpdateDestroyAction extends BaseMixin {}
applyMixins(RetrieveUpdateDestroyAction, [
  RetrieveMixin,
  UpdateMixin,
  DestroyMixin,
]);

export interface CRUDAction
  extends ListMixin,
    CreateMixin,
    RetrieveMixin,
    UpdateMixin,
    DestroyMixin {}
export class CRUDAction extends BaseMixin {}
applyMixins(CRUDAction, [
  ListMixin,
  CreateMixin,
  RetrieveMixin,
  UpdateMixin,
  DestroyMixin,
]);
